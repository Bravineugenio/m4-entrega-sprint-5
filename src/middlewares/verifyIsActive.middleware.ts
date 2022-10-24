import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../Errors/AppError";

const verifyisActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository
    .createQueryBuilder("user")
    .select([
      "user.name",
      "user.email",
      "user.isAdm",
      "user.isActive",
      "user.id",
      "user.createdAt",
      "user.updatedAt",
    ])
    .withDeleted()
    .getMany();
  const account = users.find((user) => user.id === id);

  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (decoded.isActive === true) {
        next();
      }
      if (decoded.isActive === false) {
        throw new AppError(404, "Unauthorized")
      }
      if (account?.isActive === false) {
        throw new AppError(400, "Unauthorized")
      }
    }
  );
};

export default verifyisActiveMiddleware;
