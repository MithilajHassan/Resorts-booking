import { Request, Response } from "express";
import { IUser } from "../models/userModel";
import userServices from "../services/userServices";
import otpServices from "../services/otpServices";
import CustomError from "../errors/customError";
import userRepository from "../repositories/userRepository";

class UserController{

    async signup(req:Request,res:Response){
        try {
            const { email } = req.body
            
            const existEmail = await userRepository.findByEmail(email)
            if(existEmail){
                throw new CustomError('Email already exists', 400)
            }else{
                const otp = await otpServices.generateOtp()
                if(otp){
                    await otpServices.createOtp({email,otp})
                    otpServices.sendOtpVerificationEmail(email,otp)
                    res.status(200).json({message:"OTP sent to your email",success:true})
                }
            }
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async verifyOtp(req:Request,res:Response){
        try {
            const {otp,name,email,password} = req.body
            
            const savedOtp = await otpServices.findOtp(email)
            console.log(savedOtp)
            
            if(savedOtp?.otp == otp){
                
                const user = await userServices.createUser({name,email,password})
                res.status(201).json({user,success:true})
            }else{
                res.status(500).json({message:"OTP is wrong"})
            }
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }
}

export default new UserController