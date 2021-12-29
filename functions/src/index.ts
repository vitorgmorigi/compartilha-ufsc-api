import axios, { AxiosResponse } from "axios";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
import * as express from "express";

import { envs } from "./config";
import { CreateCircleRepository } from "./features/create-circle/create-circle-repository";
import { listCirclesController } from "./features/list-circles";
import { databaseInstance } from "./database";


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

app.get("/circle", async (req, res) => {
  const { name } = req.query;

  try {
    const response = await listCirclesController.handle(name?.toString());

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/circle", async (req, res) => {
  const createCircleRepository = new CreateCircleRepository(databaseInstance);

  const { circle } = req.body;

  try {
    const response = await createCircleRepository.create(circle);

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

exports.api = functions.https.onRequest(app);
