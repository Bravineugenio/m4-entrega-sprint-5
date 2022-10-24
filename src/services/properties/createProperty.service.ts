import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../Errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoryRepository = AppDataSource.getRepository(Categories);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const category2 = await categoryRepository
    .createQueryBuilder("categories")
    .select(["categories.name", "categories.id"])
    .getOne();

  //   const categoryAlreadyExists = await categoryRepository.findOneBy({
  //     id: categoryId,
  //   });

  if (!category2) {
    throw new AppError(404, "Category dont exists");
  }

  const addressAlreadyExist = await addressRepository.findOne({
    where: { ...address },
  });
  if (addressAlreadyExist) {
    throw new AppError(409, "Address already in use");
  }

  
  const newAddress = addressRepository.create(address);

 console.log("--------------------------------------", newAddress.state.length)
  if(newAddress.state.length>=3 ){
    throw new AppError(404, "State must have  2 caracters")
  }
  if(newAddress.state.length<=1 ){
    throw new AppError(404, "State must have at least 2 caracters")
  }

  if(newAddress.zipCode.length>=9 ){
    throw new AppError(404, "ZipCode must have  8 caracters")
  }
  if(newAddress.zipCode.length<=7 ){
    throw new AppError(404, "ZipCode must have at least 8 caracters")
  }
  
  await addressRepository.save(newAddress);

  const newProperty = propertyRepository.create({
    category: category2,
    address: newAddress,
    createdAt: new Date(),
    updatedAt: new Date(),
    size: size,
    value: value,
  });

  await propertyRepository.save(newProperty);
  return newProperty;
};

export default createPropertyService;
