import { SimpleConsoleLogger } from "typeorm";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../Errors/AppError";

const getPropertyByIdCategoryService = async (id: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const property = await propertiesRepository.find({relations:{category:true}});

  const idExists = property.find(
    (properties) => properties.category.id === id 
  );

  // return idExists

   if(!idExists){
     throw new AppError(404, "Properties by category not found");
   }
  
   if(idExists){
     return idExists;
   }
  
  
};

export default getPropertyByIdCategoryService;
