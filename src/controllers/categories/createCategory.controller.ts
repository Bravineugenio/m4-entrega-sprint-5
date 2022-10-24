import { Request, Response } from "express";
import categoryCreateService from "../../services/categories/categoryCreate.service";
import { AppError, handleError } from "../../Errors/AppError";


const categoryCreateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await categoryCreateService({name});

    return res.status(201).send(newCategory);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default categoryCreateController;
