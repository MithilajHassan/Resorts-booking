import Category, { ICategroy } from "../models/categoryModel"


class CategoryRepository{
    async create(name:string):Promise<ICategroy>{
        const category = new Category({name})
        return await category.save()
    }

    async find(){
        return await Category.find()
    }

    async findById(id:unknown):Promise<ICategroy | null>{
        return await Category.findById(id)
    }

    async findByName(name:string):Promise<ICategroy | null>{
        return await Category.findOne({name:{$regex:'^'+ name +'$', $options:'i'}})
    }
}

export default new CategoryRepository