import { Router } from "express"
import userController from "../controllers/userController"
import { userProtect, userUnProtect } from "../middleware/auth"

const userRouter = Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/verify-otp', userController.verifyOtp)
userRouter.post('/resend-otp', userController.resendOtp)
userRouter.post('/signin', userController.signin)
userRouter.get('/verifyuser', userProtect, userController.verifyUser)
userRouter.post('/signout', userController.signout)
userRouter.get('/resorts', userUnProtect, userController.findResorts)
userRouter.get('/resorts/:id', userUnProtect, userController.resortDetails)



export default userRouter