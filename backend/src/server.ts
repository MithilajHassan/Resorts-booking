import express from 'express'
import * as dotenv from 'dotenv'
import connectDB from './config/db'
import userRouter from './routes/userRoute'
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRouter)


app.listen(port,()=>{
    console.log(`Server started at : ${port}`)
})