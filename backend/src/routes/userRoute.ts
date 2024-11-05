import { Router } from "express"
import userController from "../controllers/userController"
import { userProtect, userUnProtect } from "../middleware/auth"
import bookingController from "../controllers/bookingController"

const userRouter = Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/verify-otp', userController.verifyOtp)
userRouter.post('/resend-otp', userController.resendOtp)
userRouter.post('/signin', userController.signin)
userRouter.post('/signout', userController.signout)

userRouter.get('/verifyuser', userProtect, userController.verifyUser)
userRouter.get('/resorts', userUnProtect, userController.findResorts)
userRouter.get('/resorts/:id', userUnProtect, userController.resortDetails)
userRouter.post('/search-resort', userUnProtect, userController.searchRooms)

userRouter.post('/checkout', userProtect, bookingController.createBooking)
userRouter.patch('/paymentstatus',userProtect, bookingController.setPaymentStatus)
userRouter.get('/bookings/:userId', userProtect, bookingController.getBookingsByUserId)



export default userRouter










// userRouter.get('/auth/google/url', (req, res) => {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5000&response_type=code&scope=profile email`;
//     res.json({ url });
// })

// userRouter.get('/auth/google/callback',
//     passport.authenticate('google', { session: false, failureRedirect: '/signin' }),
//     (req:any, res) => {
//         res.cookie('userAccessT', req.user.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
//         res.cookie('userRefreshT', req.user.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
//         res.json({ success:true })
//     }
// )
