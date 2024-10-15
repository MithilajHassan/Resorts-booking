import jwt from 'jsonwebtoken'
import CustomError from '../errors/customError';
import { IResort } from '../models/resortModel'
import resortRepository from '../repositories/resortRepository'
import bcrypt from 'bcrypt'
import { Response } from 'express'

export default new class ResortService {

    async createResort(resortData: IResort): Promise<IResort> {
        const exist = await resortRepository.findByEmail(resortData.email)
        if (exist) {
            throw new CustomError('Eamil is already exist', 409)
        }
        return await resortRepository.createResort(resortData)
    }

    async handleResortSignin(email: string, password: string, res: Response): Promise<IResort | undefined> {
        const resort = await resortRepository.findByEmail(email)
        if (!resort) {
            throw new CustomError('Invalid Email', 401)
        }
        if (await bcrypt.compare(password, resort.password)) {
            if (resort.isVerify == false) {
                throw new CustomError('You are not verified, Please wait.', 403)
            } else if (resort.isBlock) {
                throw new CustomError('Your account is blocked', 403)
            } else {
                const token = jwt.sign({ id: resort._id }, process.env.JWT_SECRET!, { expiresIn: '30d' })
                res.cookie('Rjwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })
                return resort
            }
        } else {
            throw new CustomError('Invalid password', 401)
        }
    }

    async editResort(resortData: IResort,resortId:string): Promise<IResort | null> {
        const exist = await resortRepository.findByEmail(resortData.email)
        if (exist && exist.email != resortData.email) {
            throw new CustomError('Eamil is already exist', 409)
        }
        return await resortRepository.editResort(resortData,resortId)
    }

}