import { IUserLogin } from "../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../Errors/AppError";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(401, "Account not found");
  }

  if (!bcryptjs.compareSync(password, account.password)) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = jwt.sign(
    {
      email: email,
      id: account.id,
      isAdm: account.isAdm,
      isActive: account.isActive,
    },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h" }
  );

  return token;
};

export default userLoginService;
