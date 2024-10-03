
import Facility, { IFacility } from './../models/facilityModel'


class FacilityRepository{
    async create(data:IFacility):Promise<IFacility>{
        const facility = new Facility(data)
        return await facility.save()
    }

    async findById(id:unknown):Promise<IFacility | null>{
        return await Facility.findById(id)
    }

    async findByName(name:string):Promise<IFacility | null>{
        return await Facility.findOne({facilityName:{$regex:'^'+ name +'$', $options:'i'}})
    }
}

export default new FacilityRepository