import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { AppError, handleError } from "../../Errors/AppError";
const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedData: any = req.body;

    const user = await updateUserService(id, updatedData);

    return res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default updateUserController;
