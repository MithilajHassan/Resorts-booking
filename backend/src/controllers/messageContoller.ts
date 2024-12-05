import { Request, Response } from "express"
import CustomError from "../errors/customError"
import { IMessage } from "../models/messageModel"
import messageServices from "../services/messageServices"


class MessageController {

    async sendMessage(req: Request, res: Response) {
        try {
            const { messageData }: { messageData: IMessage } = req.body
            const message = await messageServices.sendMessage(messageData)
            res.status(200).json({ message })
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).json({ message: err.message })
            } else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

}

export default new MessageController