import { ICategoryRequest } from "../../interfaces/categories";
import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../Errors/AppError";

const categoryCreateService = async ({ name }: ICategoryRequest) => {
  
  const categoryRepository = AppDataSource.getRepository(Categories);
  const categories = await categoryRepository.find();
  const nameAlreadyExists = categories.find(
    (categories) => categories.name === name
  );

  if (nameAlreadyExists) {
     throw new AppError(409, "Category name already exists");
  }

  const category = new Categories();
  category.name = name

  categoryRepository.create(category);
  await categoryRepository.save(category);

  return category;
};

export default categoryCreateService;
