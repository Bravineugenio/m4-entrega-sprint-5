import { Request, Response } from "express";
import getAllPropertiesService from "../../services/properties/getAllProperties.service";
import { AppError, handleError } from "../../Errors/AppError";

const getAllPropertiesController = async (req: Request, res: Response) => {
  try {
    const property = await getAllPropertiesService();

    return res.send(property);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default getAllPropertiesController;