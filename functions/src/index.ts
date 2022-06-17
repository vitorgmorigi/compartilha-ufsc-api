import axios, { AxiosResponse } from "axios";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../credentials/compartilha-ufsc-e4828d320945.json");

const BUCKET_NAME = "compartilha-ufsc.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_NAME
});
import * as express from "express";
import { Option } from "monapt";
import * as multer from "multer"; 

import { envs } from "./config";
import { auth } from "./middleware/auth";

import { listCirclesController } from "./features/list-circles";
import { createCircleController } from "./features/create-circle";
import { userLoginController } from "./features/user-login";
import { joinInACircleController } from "./features/join-in-a-circle";
import { createCategoryController } from "./features/create-category";
import { publishItemController } from "./features/publish-item";
import { listFeedController } from "./features/list-feed";
import { Circle } from "./models/circle";
import { uploadImage } from "./middleware/upload-image";

admin.firestore().settings({ ignoreUndefinedProperties: true });

const app = express();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  startProcessing(req, busboy) {
    req.rawBody ? busboy.end(req.rawBody) : req.pipe(busboy);
  }
});

app.use(express.json());

const axiosInstance = axios.create({
  baseURL: envs.host,
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});

app.get("/token", async (req: express.Request, res: express.Response) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ message: "query string 'code' is empty" });
  }

  const url = "/token?"
    .concat(`grant_type=${envs.grant_type}&`)
    .concat(`code=${code}&`)
    .concat(`client_id=${envs.client_id}&`)
    .concat(`redirect_uri=${envs.redirect_uri}&`)
    .concat(`client_secret=${envs.client_secret}`);

  try {
    const response: AxiosResponse = await axiosInstance.get(url);

    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/profile", async (req, res) => {
  const { access_token: accessToken } = req.query;

  if (!accessToken) {
    res.status(400).send("query string 'access_token' is empty");
  }

  const url = `/profile?access_token=${accessToken}`;

  try {
    const response: AxiosResponse = await axiosInstance.get(url);

    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  const accessToken = Option(req.headers.authorization);

  if (accessToken.isEmpty) {
    res.status(400).json("header 'authorization' is empty");

    return;
  }
  const response = await userLoginController.handle(accessToken.get());

  res.status(response.statusCode).json({ body: response.body });
});

app.get("/circle", auth(), async (req, res) => {
  const { name } = req.query;

  try {
    const response = await listCirclesController.handle(name?.toString());

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/circle", auth(), async (req, res) => {
  const { name, password, visibility } = req.body;

  try {
    const response = await createCircleController.handle(name, visibility, res.locals.user.login, password);

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/category", auth(), async (req, res) => {
  const { name } = req.body;

  try {
    const response = await createCategoryController.handle(name, res.locals.user.login);

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/item", auth(), Multer.array("image"), uploadImage, async (req, res) => {
  console.log("FILE: ", req.files);
  console.log("BODY: ", req.body);
  console.log("FIREBASE URL: ", res.locals.firebaseUrl);

  let response;
  try {
    response = await publishItemController.handle(req.body, res.locals.user, res.locals.firebaseUrl);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.get("/circles/items", auth(), async (req, res) => {
  let response;

  const circles = (req.query?.circles as string)?.split(",").map(circle => circle.trim()) 
    || (res.locals.user.circles as Circle[]).map((circle) => circle.id);
    
  const itemName = req.query?.itemName as string;

  const categoryIds = req.query?.categoryIds as string;

  try {
    response = await listFeedController.handle(circles, itemName, categoryIds);

    res.status(200).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.post("/user/circle", auth(), async (req, res) => {
  const { circle_id: circleId, circle_password: circlePassword } = req.body;
  const userId = res.locals.user.id;

  try {
    const response = await joinInACircleController.handle(userId, circleId, circlePassword);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

exports.api = functions.https.onRequest(app);
