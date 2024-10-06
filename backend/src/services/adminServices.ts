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

    async editCategory(id:unknown,name:string){
        const exist = await categoryRepository.findByName(name)
        if(exist && id != exist._id){
            throw new CustomError('It is already exist',409)
        }
        return await categoryRepository.edit(id,name)
    }

    async listCategories(){
        return await categoryRepository.find()
    }

    async deleteCategory(id:unknown){
            
        return await categoryRepository.delete(id)
    }

}

export default new AdminServices()