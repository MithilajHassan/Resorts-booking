import { Document, model, ObjectId, Schema } from "mongoose";

export interface IResort extends Document {
    resortName:string,
    email:string,
    address:string,
    city:string,
    categories:ObjectId[],
    facilities:ObjectId[],
    images:string[],
    isBlock:boolean,
    
}