import CustomError from "../errors/customError"
import categoryRepository from "../repositories/categoryRepository"


class AdminServices {
    async addCategory(name:string){
        const exist = await categoryRepository.findByName(name)
        if(exist){
            throw new CustomError('It is already exist',409)
        }
        return await categoryRepository.create(name)
    }
    async listCategories(){
        return await categoryRepository.find()
    }
}

export default new AdminServices()