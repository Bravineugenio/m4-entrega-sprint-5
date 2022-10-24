import { Request, Response, NextFunction } from "express";
import { AppError } from "../Errors/AppError";

const verifyisAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log("------------------------------", req.user.isAdm)
  if (req.user.isAdm == true) {
    next();
  }
  if (req.user.isAdm == false) {
    throw new AppError(403, "Unauthorized")
  }
};

export default verifyisAdmMiddleware;
