import { Document, model, Schema } from 'mongoose';

export interface IFacility extends Document {
    facilityName: string;
    icon: string;  
    isDelete: boolean
}

const facilitySchema = new Schema<IFacility>({
    facilityName: { type: String, required: true },
    icon: { type: String, required: true }, 
    isDelete:{ type: Boolean , default:false}
})

const Facility = model<IFacility>('Facility', facilitySchema)

export default Facility