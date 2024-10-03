import { Request, Response } from "express"
import userServices from "../services/userServices"
import CustomError from "../errors/customError"

class UserController{

    async signup(req:Request,res:Response){
        try {
            const { email } = req.body

            await userServices.handleUserSignup(email)

            res.status(200).json({message:"OTP sent to your email",success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async verifyOtp(req:Request,res:Response){
        try {
            const {otp,name,email,password} = req.body
                
            const user = await userServices.verifyOtpAndCreate(otp,{name,email,password})

            res.status(201).json({user,success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async resendOtp(req:Request,res:Response){
        try {
            const { email } = req.body

            await userServices.handleUserSignup(email)
            
            res.status(200).json({message:"OTP resent to your email",success:true})
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
                
            const user = await userServices.handleUserSignin(email,password,role,res)

            res.status(201).json({
                _id: user?._id,
                name: user?.name,
                email: user?.email,
                avatar: user?.avatar,
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

            res.cookie('jwt','',{
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

export default new UserController