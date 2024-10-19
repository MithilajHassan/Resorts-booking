import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { IUser } from "../models/userModel"
import userRepository from "../repositories/userRepository"
import CustomError from '../errors/customError'
import otpServices from "./otpServices"
import { Response } from 'express'
import resortRepository from '../repositories/resortRepository'
import { IResort } from '../models/resortModel'

class UserServices {
    async handleUserSignup(email: string) {
        const existEmail = await userRepository.findByEmail(email)
        if (existEmail) {
            throw new CustomError('Email already exists', 400)
        }
        const otp = otpServices.generateOtp()
        await otpServices.createOtp({ email, otp })
        otpServices.sendOtpVerificationEmail(email, otp)
    }

    async verifyOtpAndCreate(otp: string, userData: Partial<IUser>): Promise<IUser> {
        const savedOtp = await otpServices.findOtp(userData.email!)
        if (!savedOtp) {
            throw new CustomError('OTP code expired', 403)
        }

        if (savedOtp.otp !== otp) {
            throw new CustomError('OTP is incorrect', 401)
        }

        return await userRepository.create(userData)
    }

    async findUserById(id:string):Promise<IUser | null>{
        return await userRepository.findById(id)
    }

    async handleUserSignin(email: string, password: string, role: string, res: Response): Promise<IUser | undefined> {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new CustomError('Invalid Email', 401)
        }
        if (await bcrypt.compare(password, user.password)) {
            if (user.isBlock) {
                throw new CustomError('Your account is blocked', 403)
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })

                if (role == 'user') {
                    if (user.role != role) {
                        throw new CustomError('Invalid Email', 401)
                    }
                    res.cookie('jwt', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    })
                } else if (role == 'admin') {
                    if (user.role != role) {
                        throw new CustomError('You are not an admin', 401)
                    }
                    res.cookie('Ajwt', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    })
                }

                return user
            }
        } else {
            throw new CustomError('Invalid password', 401)
        }
    }

    async findResorts(): Promise<IResort[]> {
        return await resortRepository.findVerifiedResorts()
    }
    async resortDetails(id: string): Promise<IResort | null> {
        return await resortRepository.findResortById(id)
    }

}
export default new UserServices()