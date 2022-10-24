import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";
import { AppError, handleError } from "../../Errors/AppError";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user_id = id;

    const user = await deleteUserService(user_id);

    return res.status(204).json({ message: "User deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteUserController;
