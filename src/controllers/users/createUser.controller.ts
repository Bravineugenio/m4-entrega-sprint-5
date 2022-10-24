import { Request, Response } from "express";
import userCreateService from "../../services/users/createUser.service";
import { AppError, handleError } from "../../Errors/AppError";
const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;

    const newUser = await userCreateService({
      name,
      email,
      password,
      isAdm,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;
