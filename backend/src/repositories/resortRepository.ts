import { IResort, Resort } from '../models/resortModel'

export default new class ResortRepository {
    async createResort(resortData: IResort): Promise<IResort> {
        const newResort = new Resort(resortData)
        return await newResort.save()
    }

    async findByEmail(email: string): Promise<IResort | null> {
        return await Resort.findOne({ email })
    }

    async findResortById(id: string): Promise<IResort | null> {
        return await Resort.findById(id).populate('categories').populate('facilities')
    }

    async findAll(): Promise<IResort[] | []> {
        return await Resort.find()
    }
    async findVerifiedResort(id: string): Promise<IResort | null> {
        return await Resort.findOne({ _id: id, isVerify: true, isBlock: false })
    }

    async accept(id: unknown): Promise<IResort | null> {
        return await Resort.findByIdAndUpdate(id, { $set: { isVerify: true } }, { new: true })
    }
    async reject(id: unknown): Promise<IResort | null> {
        return await Resort.findByIdAndUpdate(id, { $set: { isVerify: false } }, { new: true })
    }
    async manageResortBlock(id: string, status: boolean): Promise<IResort | null> {
        return await Resort.findByIdAndUpdate(id, { $set: { isBlock: status } })
    }
    async editResort(resortData: IResort, id: string): Promise<IResort | null> {
        return await Resort.findByIdAndUpdate(id, { $set: resortData }, { new: true }).populate('categories').populate('facilities')
    }

    async findResortsByCity(place: string): Promise<IResort[] | null> {
        return await Resort.find({
            $or: [
                { city: { $regex: place, $options: "i" } },
                { resortName: { $regex: place, $options: "i" } }
            ]
            ,
            isBlock: false,
            isVerify: true
        })
    }

}