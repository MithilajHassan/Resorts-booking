import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { IMessage } from '../models/messageModel'

export const app = express()

export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5000"],
        methods: ["GET", "POST",],
    }
})

io.on("connection", (socket) => {
    console.log('socket connected : '+socket.id)

    socket.on('joinRoom', (userId: string) => {
        socket.join(userId) 
    })

    socket.on('sendMessage', (message:IMessage) => {
        socket.to(String(message.receiverId)).emit('receiveMessage', message);
    })

    socket.on("disconnect", () => {
        console.log('socket disconnected : '+socket.id)
    })
})