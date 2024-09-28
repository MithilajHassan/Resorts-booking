import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    name:string,
    email:string,
    phone?:number,
    password:string,
    walletBalance:number,
    avatar?:string,
    role:string,
    isBlock:boolean
}

interface Methods {
    comparePassword(enteredPassword:string):Promise<boolean>
}

const userSchema = new Schema<IUser, {}, Methods>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    phone: { type: Number, required:false},
    password: { type: String, required: true },
    walletBalance: { type: Number, default:0 },
    avatar: { type: String, required: false },
    role: { type: String,enum: ['user','admin','resortAdmin'], default:'user' },
    isBlock: { type: Boolean, default:false },
})
userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (enteredPassword:string) :Promise<boolean> {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = model<IUser>('User',userSchema)

export default User