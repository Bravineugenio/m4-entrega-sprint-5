import { Request, Response } from "express";
import getAllUsersService from "../../services/users/getAllUsers.service";
import { AppError, handleError } from "../../Errors/AppError";

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();

    return res.send(users);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getAllUsersController;
