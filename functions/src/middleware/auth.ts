import { NextFunction, Request, Response } from "express";
import { loginServiceInstance } from "../services/login";

export const auth = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json("header 'authorization' is empty");

    return;
  }

  try {
    res.locals.user = await loginServiceInstance.getProfile(authorization);

    next();
  } catch (error) {
    res.status(401).json("Token is invalid or expired");
  }
};
