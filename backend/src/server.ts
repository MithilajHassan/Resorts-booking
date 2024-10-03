import express from 'express'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import connectDB from './config/db'
import userRouter from './routes/userRoute'
import resortAdminRouter from './routes/resortAdminRoute'
import adminRouter from './routes/adminRoutes'
import errorHandler from './middleware/errorHandler'
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/api/user',userRouter)
app.use('/api/resort',resortAdminRouter)
app.use('/api/admin',adminRouter)




app.listen(port,()=>{
    console.log(`Server started at : ${port}`)
})