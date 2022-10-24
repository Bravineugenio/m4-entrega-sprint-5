import { Request, Response } from "express";
import getAllCategoriesService from "../../services/categories/getAllCategories.service";
import { AppError, handleError } from "../../Errors/AppError";

const getAllCategoriesController = async (req: Request, res: Response) => {
  try {
    const category = await getAllCategoriesService();

    return res.send(category);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getAllCategoriesController;
