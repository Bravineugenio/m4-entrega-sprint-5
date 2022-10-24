import { Request, Response, NextFunction } from "express";
import { AppError } from "../Errors/AppError";

const verifyAdmUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.user.isAdm) {
    throw new AppError(401, "It`s not Admin")
  }

  if (req.user.isAdm) {
    return next();
  }
};

export default verifyAdmUpdateMiddleware;
