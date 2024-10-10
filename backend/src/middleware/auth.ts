import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: string;
    role: 'admin' | 'user';
}

export const adminProtect = (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies?.Ajwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            if (decoded.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized, invalid token' })
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
