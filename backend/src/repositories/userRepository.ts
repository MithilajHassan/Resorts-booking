import User, { IUser } from "../models/userModel";

class UserRepository {
    async create(userData:Partial<IUser>): Promise<IUser> {
        const user = new User(userData)
        return await user.save() 
    }
    
    async findByEmail(email:string):Promise<IUser | null>{
        return await User.findOne({email})
    }

    async findAllUsers(userData:Partial<IUser>): Promise<IUser[]> {
        return await User.find({role:'user'}) 
    }
    
}

export default new UserRepository()