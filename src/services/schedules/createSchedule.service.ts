import  { Schedules }  from "../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import { IScheduleRequest } from "../../interfaces/schedules";
import { AppError } from "../../Errors/AppError";
import { Properties } from "../../entities/properties.entity";
import { User } from "../../entities/user.entity";

const schedulesCreateService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "User Does Not Exists");
  }

  const property = await propertiesRepository.findOneBy({ id: propertyId });

  if (!property) {
    throw new AppError( 404,"Property Does Not Exists");
  }

  const newDate = new Date(date);
  const newHour = Number(hour.split(":")[0]);
  const newMinute = Number(hour.split(":")[1]);
  newDate.setHours(newHour, newMinute, 0);
  const weekDay = newDate.getDay();
  const filterDate = date.split("/").join("-");

  const scheduleAlreadyExist = await schedulesRepository.find();

  const scheduleAlreadyExistFiltered = scheduleAlreadyExist.find(
    (schedule) => String(schedule.date) === filterDate
  );

  if (scheduleAlreadyExistFiltered) {
    throw new AppError(400, "Date not available");
  }

  if (newHour < 8 || newHour > 18 || (newHour === 18 && newMinute > 0)) {
    throw new AppError(400, "Invalid Hour");
  }

  if (weekDay < 1 || weekDay > 5) {
    throw new AppError( 400, "Invalid Day");
  }

  const newSchedule = new Schedules();
  newSchedule.date = newDate;
  newSchedule.hour = newDate;
  newSchedule.property = property;
  newSchedule.user = user;

  await schedulesRepository.save(newSchedule);

  return true;
};

export default schedulesCreateService;