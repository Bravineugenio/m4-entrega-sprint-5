import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";
import { AppError, handleError } from "../../Errors/AppError";


const createScheduleController = async (req: Request, res: Response) => {
  try {

    const userId = req.user.id
    const {date, hour, propertyId} = req.body;

    const newSchedule = await createScheduleService({date, hour, propertyId, userId });

    return res.status(201).json({message: "Schedule done"});
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createScheduleController;