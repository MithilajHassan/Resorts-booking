import { IUser } from "../models/userModel";
import UserRepository from "../repositories/userRepository";
import CustomError from '../errors/customError'

class UserServices{
    async createUser (userData:Partial<IUser>):Promise<IUser>{
        // const existEmail = await UserRepository.findByEmail(userData.email!)
        // if(existEmail){
        //     throw new CustomError('Email already exists', 400)
        // }else{
            return await UserRepository.create(userData)
        //}
    }
}
export default new UserServices()