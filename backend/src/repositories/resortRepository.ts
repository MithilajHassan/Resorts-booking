import { IResort } from '../models/resortModel'
import { Resort } from '../models/resortModel'

export default new class ResortRepository {
    async createResort(resortData: IResort): Promise<IResort> {
        const newResort = new Resort(resortData)
        return await newResort.save()
    }

    async findByEmail(email:string):Promise<IResort|null>{
        return await Resort.findOne({email})
    }

    async findResortById(id: string): Promise<IResort | null> {
        return await Resort.findById(id).populate('categories').populate('facilities')
    }

    async findAll():Promise<IResort[] | []>{
        return await Resort.find()
    }
    async findVerifiedResorts():Promise<IResort[] | []>{
        return await Resort.find({isVerify:true,isBlock:false})
    }
    
    async accept(id:unknown):Promise<IResort | null>{
        return await Resort.findByIdAndUpdate(id,{isVerify:true},{new:true})
    }
    async reject(id:unknown):Promise<IResort | null>{
        return await Resort.findByIdAndUpdate(id,{isVerify:false},{new:true})
    }
    async manageResortBlock(id:string,status:boolean):Promise<IResort|null>{
        return await Resort.findByIdAndUpdate(id,{isBlock:status})
    }

}