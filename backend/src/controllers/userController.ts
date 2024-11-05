import { Request, Response } from "express"
import userServices from "../services/userServices"
import CustomError from "../errors/customError"
import { CustomRequest } from "../middleware/auth"
import resortServices from "../services/resortServices"

class UserController {

    async signup(req: Request, res: Response) {
        try {
            const { email } = req.body

            await userServices.handleUserSignup(email)

            res.status(200).json({ message: "OTP sent to your email", success: true })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const { otp, name, email, password } = req.body

            const user = await userServices.verifyOtpAndCreate(otp, { name, email, password })

            res.status(201).json({ user, success: true })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async resendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body

            await userServices.handleUserSignup(email)

            res.status(200).json({ message: "OTP resent to your email", success: true })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body

            const user = await userServices.handleUserSignin(email, password, role, res)

            res.status(200).json({
                _id: user?._id,
                name: user?.name,
                email: user?.email,
                avatar: user?.avatar,
            })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async verifyUser(req: CustomRequest, res: Response) {
        try {
            const { _id, name, email, avatar, isBlock } = req.user!

            res.status(200).json({
                _id,
                name,
                email,
                avatar,
                isBlock
            })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async signout(req: Request, res: Response) {
        try {

            res.cookie('userAccessT', '', {
                httpOnly: true,
                expires: new Date(0),
            })
            res.cookie('userRefreshT', '', {
                httpOnly: true,
                expires: new Date(0),
            })


            res.status(200).json({ message: "You are signed out", success: true })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async findResorts(req: Request, res: Response) {
        try {
            const resorts = await userServices.findResorts()
            res.status(200).json(resorts)
        } catch (error) {
            res.status(500).json({ message: 'Failed to get resorts', error })
        }
    }

    async resortDetails(req: Request, res: Response) {
        try {
            const { id } = req.params
            const resort = await userServices.resortDetails(id)
            res.status(200).json(resort)
        } catch (error) {
            res.status(500).json({ message: 'Failed to get resort Details', error })
        }
    }

    async searchRooms(req: Request, res: Response) {
        try {
            const { place, guestCount, checkIn, checkOut } = req.body;
            

            if (!place || !guestCount || !checkIn || !checkOut) {
                return res.status(400).json({ error: "Missing required search parameters" });
            }

            const checkInDate = new Date(checkIn)
            const checkOutDate = new Date(checkOut)

            const availableRooms = await resortServices.searchRooms({
                place,
                guestCount: parseInt(guestCount),
                checkIn: checkInDate,
                checkOut: checkOutDate
            });

            if (!availableRooms.length) {
                return res.status(404).json({ message: "No available rooms found" });
            }

            return res.status(200).json(availableRooms);
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default new UserController