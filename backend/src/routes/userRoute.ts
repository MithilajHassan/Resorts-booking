import { Router } from "express"
import userController from "../controllers/userController"

const userRouter = Router()

userRouter.post('/signup',userController.signup)
userRouter.post('/verify-otp',userController.verifyOtp)
userRouter.post('/resend-otp',userController.resendOtp)
userRouter.post('/signin',userController.signin)
userRouter.post('/signout',userController.signout)



export default userRouter