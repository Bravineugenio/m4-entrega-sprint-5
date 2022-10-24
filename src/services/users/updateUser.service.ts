import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import * as bcryptjs from "bcryptjs";
import { AppError } from "../../Errors/AppError";

const updateUserService = async (id: string, updatedData: any) => {
  if (
    updatedData.isAdm === false ||
    updatedData.isAdm === true ||
    updatedData.id === false ||
    updatedData.id === true ||
    updatedData.isActive === true ||
    updatedData.isActive === false
  ) {
    throw new AppError(
      401,
      "Update is available only for name, email and password"
    );
  }

  const userRepository = AppDataSource.getRepository(User);

  // const users = await userRepository.find();

  // const account = users.find((user) => user.id === id);

  const account = await userRepository.findOneBy({ id });

  if (updatedData.password) {
    if (bcryptjs.compareSync(updatedData.password, account!.password)) {
      throw new AppError(401, "Inform a different password.");
    }
  }

  const newName = updatedData.name ? updatedData.name : account?.name;
  const newEmail = updatedData.email ? updatedData.email : account?.email;
  const newPassword = updatedData.password
    ? bcryptjs.hashSync(updatedData.password, 10)
    : account?.password;
  const updatedNow = new Date();

  await userRepository.update(account!.id, {
    name: newName,
    email: newEmail,
    password: newPassword,
    updatedAt: updatedNow,
  });

  return true;
};

export default updateUserService;
