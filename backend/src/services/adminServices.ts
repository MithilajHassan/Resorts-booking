import CustomError from "../errors/customError"
import categoryRepository from "../repositories/categoryRepository"
import facilityRepository from "../repositories/facilityRepository"


class AdminServices {
    // Category ---------------------------------------------------------------
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

    // Facility --------------------------------------------

    async addFacility(name:string){
        const exist = await facilityRepository.findByName(name)
        if(exist){
            throw new CustomError('It is already exist',409)
        }
        return await facilityRepository.create(name)
    }

    async listfacilities(){
        return await facilityRepository.find()
    }

    async editFacility(id:unknown,name:string){
        const exist = await facilityRepository.findByName(name)
        if(exist && id != exist._id){
            throw new CustomError('It is already exist',409)
        }
        return await facilityRepository.edit(id,name)
    }

    async deleteFacility(id:unknown){
            
        return await facilityRepository.delete(id)
    }

}

export default new AdminServices()