import { Request, Response } from "express"
import CustomError from "../errors/customError"
import resortServices from "../services/resortServices"
import { IResort } from "../models/resortModel"


class ResortAdminController {

    async register(req:Request,res:Response){
        try {       
            const resortData: IResort = req.body
            const newResort = await resortServices.createResort(resortData)
            return res.status(201).json({ success: true, data: newResort })
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async signin(req:Request,res:Response){
        try {
            const {email,password,role} = req.body
                
            const resort = await resortServices.handleResortSignin(email,password,res)

            res.status(201).json({success:true,
               resortAdmin:{ _id: resort?._id,
                name: resort?.resortName,
                email: resort?.email,}
            })
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async signout(req:Request,res:Response){
        try {       
            res.cookie('Rjwt','',{
                httpOnly:true,
                expires:new Date(0),
            })
            
            res.status(200).json({message:"You are signed out",success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }


}

export default new ResortAdminController