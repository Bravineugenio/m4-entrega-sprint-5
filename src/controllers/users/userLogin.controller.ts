import { Request, Response } from "express";
import userLoginService from "../../services/users/userLogin.service";
import { AppError, handleError } from "../../Errors/AppError";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await userLoginService({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userLoginController;