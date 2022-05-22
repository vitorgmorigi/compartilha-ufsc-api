import axios, { AxiosResponse } from "axios";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
import * as express from "express";
import { Option } from "monapt";

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

admin.firestore().settings({ ignoreUndefinedProperties: true });

const app = express();

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
    const response = await createCircleController.handle(name, password, visibility, res.locals.user.login);

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

app.post("/item", auth(), async (req, res) => {
  let response;
  try {
    response = await publishItemController.handle(req.body, res.locals.user);

    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(response?.statusCode || 500).json(error);
  }
});

app.get("/feed", auth(), async (req, res) => {
  let response;

  const circles = (req.query?.circles as string)?.split(",") 
    || (res.locals.user.circles as Circle[]).map((circle) => circle.id); 

  try {
    response = await listFeedController.handle(circles);

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
