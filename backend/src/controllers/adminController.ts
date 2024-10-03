import { Request, Response } from "express"
import CustomError from "../errors/customError"
import adminServices from "../services/adminServices"


class AdminController {

    async signout(req:Request,res:Response){
        try {       
            res.cookie('Ajwt','',{
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

    async addCategory(req:Request,res:Response){
        try {       
            const { name } = req.body
            const category = await adminServices.addCategory(name)
            res.status(200).json({category,success:true})
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

export default new AdminController