import { AppError, handleError } from "./../../Errors/AppError";
import { Request, Response } from "express";
import schedulesListService from "../../services/schedules/listSchedules.service";

const schedulesListController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const schedules = await schedulesListService(id);

    return res.status(200).json({ schedules: schedules });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error,res);
    }
  }
};

export default schedulesListController;