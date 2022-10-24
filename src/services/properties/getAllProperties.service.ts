import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";


const getAllPropertiesService = async () => {
    
    const propertyRepository = AppDataSource.getRepository(Properties);
    const teste = propertyRepository.find()

    return teste

};

export default getAllPropertiesService;
