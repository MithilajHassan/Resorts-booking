import jwt from 'jsonwebtoken'
import CustomError from '../errors/customError';
import { IResort } from '../models/resortModel'
import resortRepository from '../repositories/resortRepository'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import { generateAccessToken, generateRefreshToken } from '../utils/jwtHelper';

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
                const accessToken = generateAccessToken({id:resort._id as string,role:'resort'})
                const refreshToken = generateRefreshToken(resort._id as string)
                res.cookie('resortAccessT', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000,
                })
                res.cookie('resortRefreshT', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
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