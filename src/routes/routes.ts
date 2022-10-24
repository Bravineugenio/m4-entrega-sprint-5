import { Router } from "express";

const routes = Router();

import userCreateController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import getAllUsersController from "../controllers/users/getAllUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import categoryCreateController from "../controllers/categories/createCategory.controller";
import getAllCategoriesController from "../controllers/categories/getAllCategories.controller"
import createPropertyController from "../controllers/properties/createProperty.controller";
import getAllPropertiesController from "../controllers/properties/getAllProperties.controller";


import verifyisActiveMiddleware from "../middlewares/verifyIsActive.middleware";
import verifyisAdmMiddleware from "../middlewares/verifyIsAdmin.middleware";
import verifyAdmUpdateMiddleware from "../middlewares/verifyAdmUpdate.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import getPropertyByIdCategoryController from "../controllers/categories/getPropertyByIdCategory.controller";
import createScheduleController from "../controllers/schedules/createSchedule.controller";
import schedulesListController from "../controllers/schedules/listSchedules.controller";

routes.post("/users", userCreateController);
routes.post("/login", userLoginController);
routes.get(
  "/users",
  ensureAuthMiddleware,
  verifyisAdmMiddleware,
  getAllUsersController
);
routes.patch(
  "/users/:id",
  ensureAuthMiddleware,
  verifyAdmUpdateMiddleware,
  updateUserController
);
routes.delete(
  "/users/:id",
  ensureAuthMiddleware,
  verifyisAdmMiddleware,
  verifyisActiveMiddleware,
  deleteUserController
);
routes.post(
  "/categories",
  ensureAuthMiddleware,
  verifyisAdmMiddleware,
  categoryCreateController
);

routes.get("/categories", getAllCategoriesController)
routes.get("/categories/:id/properties", getPropertyByIdCategoryController)
routes.post("/properties",  createPropertyController)
routes.get("/properties", getAllPropertiesController)
routes.post("/schedules",ensureAuthMiddleware, createScheduleController)
routes.get("/schedules/properties/:id", ensureAuthMiddleware,verifyisAdmMiddleware, schedulesListController)


export default routes;
