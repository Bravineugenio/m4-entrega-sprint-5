import { Request, Response } from "express";
import createPropertyService from "../../services/properties/createProperty.service";
import { AppError, handleError } from "../../Errors/AppError";


const createPropertyController = async (req: Request, res: Response) => {
  try {
    const {value,size,address,categoryId} = req.body;

    const newProperty = await createPropertyService({value,size,address,categoryId});

    return res.status(201).send(newProperty);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createPropertyController;
