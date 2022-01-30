import { NextFunction, Request, Response } from "express";
import { databaseInstance } from "../database";
import { fromDatabase, UserDatabase } from "../models/user";
import { loginServiceInstance } from "../services/login";

export const auth = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json("header 'authorization' is empty");

    return;
  }

  try {
    const userProfile = await loginServiceInstance.getProfile(authorization);
    const userDb = await databaseInstance.findOne<UserDatabase>("user", "login", userProfile.login);
    
    if (userDb.isEmpty) {
      res.locals.user = userProfile;
    } else {
      res.locals.user = fromDatabase(userDb.get());
    }
    
    next();
  } catch (error) {
    res.status(401).json("Token is invalid or expired");
  }
};
