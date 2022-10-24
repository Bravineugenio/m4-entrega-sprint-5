import { Request, Response } from "express";
import getPropertyByIdCategoryService from "../../services/categories/getPropertyByIdCategory.service";
import { AppError, handleError } from "../../Errors/AppError";


const getPropertyByIdCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   

    const user = await getPropertyByIdCategoryService(id);

    return res.json(user)
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getPropertyByIdCategoryController;
