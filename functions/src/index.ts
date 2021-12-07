import { config } from "dotenv";
config();

import axios, { AxiosResponse } from "axios";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as express from "express";

admin.initializeApp();

const app = express();

const envs = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  host: process.env.HOST,
  grant_type: process.env.GRANT_TYPE,
};

const axiosInstance = axios.create({
  baseURL: envs.host,
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});

app.get("/token", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("query string 'code' is empty");
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
    res.status(500).json({ message: error.message });
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

exports.api = functions.https.onRequest(app);
