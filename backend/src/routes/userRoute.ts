import { Router } from "express"
import userController from "../controllers/userController"

const userRouter = Router()

userRouter.post('/signup',userController.signup)
userRouter.post('/verify-otp',userController.verifyOtp)




export default userRouter