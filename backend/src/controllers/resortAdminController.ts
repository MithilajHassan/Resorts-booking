import { Request, Response } from "express"
import CustomError from "../errors/customError"
import resortServices from "../services/resortServices"
import { IResort } from "../models/resortModel"
import userServices from "../services/userServices"
import roomServices from "../services/roomServices"


class ResortAdminController {

    async register(req: Request, res: Response) {
        try {
            const resortData: IResort = req.body
            const newResort = await resortServices.createResort(resortData)
            return res.status(201).json({ success: true, data: newResort })
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

            const resort = await resortServices.handleResortSignin(email, password, res)

            res.status(201).json({
                success: true,
                resortAdmin: {
                    _id: resort?._id,
                    name: resort?.resortName,
                    email: resort?.email,
                }
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
            res.cookie('Rjwt', '', {
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

    async getMyResort(req: Request, res: Response) {
        try {
            const { id } = req.params
            const resort = await userServices.resortDetails(id)
            res.status(200).json(resort)
        } catch (error) {
            res.status(500).json({ message: 'Failed to get resort', error })
        }
    }

    async editResort(req: Request, res: Response) {
        try {
            const { id } = req.params
            const resortData: IResort = req.body
            console.log(id, resortData);

            const resort = await resortServices.editResort(resortData, id)
            return res.status(201).json({ success: true, data: resort })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }


    async getRoomsByResortId(req: Request, res: Response) {
        try {
            const { resortId } = req.params
            const rooms = await roomServices.getRoomsByResortId(resortId)
            res.status(200).json(rooms)
        } catch (error) {
            res.status(500).json({ message: 'Failed to get rooms', error })
        }
    }

    async getRoomsById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const rooms = await roomServices.getRoomsById(id)
            res.status(200).json(rooms)
        } catch (error) {
            res.status(500).json({ message: 'Failed to get rooms', error })
        }
    }

    async addRoom(req: Request, res: Response) {
        try {
            const roomData = req.body

            const rooms = await roomServices.createRoom(roomData)
            res.status(200).json(rooms)
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Failed to get rooms', err })
            }
        }
    }

    async editRoom(req: Request, res: Response) {
        try {
            const { id } = req.params
            const roomData = req.body

            const room = await roomServices.editRoom(id, roomData)
            res.status(200).json({room, success:true})
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Failed to delete room', err })
            }
        }
    }

    async deleteRoom(req: Request, res: Response) {
        try {
            const { id } = req.params

            await roomServices.deleteRoom(id)
            res.status(200).json({success:true})
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Failed to delete room', err })
            }
        }
    }

}

export default new ResortAdminController