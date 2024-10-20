import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/userRepository';
import resortRepository from '../repositories/resortRepository';
import { IUser } from '../models/userModel';

interface JwtPayload {
    id: string;
}
export interface CustomRequest extends Request {
    user?: IUser;
}

export const adminProtect = async(req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.cookies?.Ajwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await userRepository.findById(decoded.id)
            
            if (user?.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized, invalid token' })
            }
            req.user = user
            next()
        } catch (error) {
            res.status(401);
            return res.json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401);
        return res.json({ message: 'Not authorized, no token' });
    }
}


export const userProtect = async(req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies?.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await userRepository.findById(decoded.id)
            if (user?.role !== 'user') {
                return res.status(401).json({ message: 'Not authorized, invalid token' })
            }else if(user.isBlock){
                return res.status(401).json({ messsage:'Your account is blocked', isBlocked:user.isBlock})
            }
            // req.user = user
            next()
        } catch (error) {
            res.status(401);
            return res.json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401);
        return res.json({ message: 'Not authorized, no token' });
    }
}


export const resortProtect = async(req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies?.Rjwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const resort = await resortRepository.findResortById(decoded.id)
            if (!resort) {
                return res.status(401).json({ message: 'Not authorized, invalid token' })
            }else if(resort.isBlock){
                res.cookie('Rjwt', '', {
                    httpOnly: true,
                    expires: new Date(0),
                })
                return res.status(401).json({ messsage:'Your account is blocked', isBlocked:resort.isBlock})
            }

            next()
        } catch (error) {
            res.status(401);
            return res.json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401);
        return res.json({ message: 'Not authorized, no token' });
    }
}
