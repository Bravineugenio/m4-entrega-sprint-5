import { Schedules } from "../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import {AppError} from "../../Errors/AppError";

const schedulesListService = async (id: string) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const schedules = await schedulesRepository.find({
    where: { property: { id } },
    relations: { user: true },
  });

  if (schedules.length === 0) {
    throw new AppError(404, "Invalid Id");
  }

  return schedules;
};

export default schedulesListService;