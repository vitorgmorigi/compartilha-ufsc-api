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
import { getItemDetailsController } from "./features/get-item-details";
import { listCategoriesController } from "./features/list-categories";
import { createItemInterestController } from "./features/create-item-interest";
import { replyItemInterestController } from "./features/reply-item-interest";
import { listCreatedItemsAndInterestsController } from "./features/list-created-items-and-interests";
import { deleteItemController } from "./features/delete-item";

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

app.get("/category", auth(), async (req, res) => {
  try {
    const response = await listCategoriesController.handle();

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
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

app.post("/item-interest", auth(), async (req, res) => {
  const { item } = req.body;

  try {
    const response = await createItemInterestController.handle({ item }, res.locals.user);

    res.json(response);
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

app.patch("/item-interest/:itemInterestId/reply", auth(), async (req, res) => {
  const { answer, itemId } = req.body;
  const { itemInterestId } = req.params;

  let response;
  try {
    response = await replyItemInterestController.handle(itemInterestId, { answer, itemId });

    res.json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).send(error);
  }
});

app.post("/item", auth(), Multer.array("image"), uploadImage, async (req, res) => {
  let response;
  try {
    response = await publishItemController.handle(req.body, res.locals.user, res.locals.firebaseUrl);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.get("/item/:itemId", auth(), async (req, res) => {
  let response;
  try {
    const { itemId } = req.params;

    response = await getItemDetailsController.handle(itemId);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.delete("/item/:itemId", auth(), async (req, res) => {
  let response;
  try {
    const { itemId } = req.params;

    response = await deleteItemController.handle(itemId, res.locals.user.id);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.get("/feed", auth(), async (req, res) => {
  let response;

  const circlesToFilter = (req.query?.circles as string)?.split(",")?.map(circle => circle.trim());
  
  const privateCircles = (res.locals.user.privateCircles as Circle[])?.map((circle) => circle.id);
    
  const itemName = req.query?.itemName as string;

  const categoryIds = req.query?.categoryIds as string;

  try {
    response = await listFeedController.handle(circlesToFilter, privateCircles, itemName, categoryIds);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(response?.statusCode || 500).json(error);
  }
});

app.get("/user/items", auth(), async (req, res) => {
  const userId = res.locals.user.id;
  
  try {
    const response = await listCreatedItemsAndInterestsController.handle(userId);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json(error);
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
