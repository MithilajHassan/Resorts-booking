import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

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
    socket.on("disconnect", () => {
        console.log('socket disconnected : '+socket.id)
    })
})