import User, { IUser } from "../models/userModel";

class UserRepository {
    async create(userData:Partial<IUser>): Promise<IUser> {
        const user = new User(userData)
        return await user.save() 
    }
    async findById(id:string):Promise<IUser | null>{
        return await User.findById(id)
    }
    
    async findByEmail(email:string):Promise<IUser | null>{
        return await User.findOne({email})
    }

    async findAllUsers(): Promise<IUser[]> {
        return await User.find({role:'user'}) 
    }
    async manageUserBlock(id:string,status:boolean):Promise<IUser|null>{
        return await User.findByIdAndUpdate(id,{isBlock:status})
    }
    
}

export default new UserRepository()