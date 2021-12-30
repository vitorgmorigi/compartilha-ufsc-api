import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { envs } from "../config";


const axiosInstance = axios.create({
  baseURL: envs.host,
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});

export const auth = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json("header 'authorization' is empty");
  }

  const url = `/profile?access_token=${authorization}`;

  try {
    await axiosInstance.get(url);

    next();
  } catch (error) {
    res.status(401).json("Token is invalid or expired");
  }
};
