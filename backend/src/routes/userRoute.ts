import { Router } from "express"
import userController from "../controllers/userController"
import { userProtect, userUnProtect } from "../middleware/auth"
import bookingController from "../controllers/bookingController"
import reviewController from "../controllers/reviewController"
import wishlistController from "../controllers/wishlistController"
import bannerController from "../controllers/bannerController"
import couponController from "../controllers/couponController"
import messageContoller from "../controllers/messageContoller"

const userRouter = Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/verify-otp', userController.verifyOtp)
userRouter.post('/resend-otp', userController.resendOtp)
userRouter.post('/signin', userController.signin)
userRouter.post('/signout', userController.signout)

userRouter.get('/verifyuser', userProtect, userController.verifyUser)
userRouter.patch('/updatepassword/:id', userProtect, userController.updateUserPassword)
userRouter.patch('/update/:id', userProtect, userController.updateUser)

userRouter.get('/resorts', userUnProtect, userController.trendResorts)
userRouter.get('/resorts/:id', userUnProtect, userController.resortDetails)
userRouter.post('/search-resort', userUnProtect, userController.searchRooms)

userRouter.post('/checkout', userProtect, bookingController.createBooking)
userRouter.patch('/paymentstatus',userProtect, bookingController.setPaymentStatus)
userRouter.get('/bookings/:userId', userProtect, bookingController.getBookingsByUserId)
userRouter.patch('/bookings/:id', userProtect, bookingController.updateBookingStatus)

userRouter.post('/reviews', userUnProtect, reviewController.createReview)
userRouter.get('/reviews/:id', userUnProtect, reviewController.getReviewsByResortId)

userRouter.get('/wishlist/:userId', userProtect, wishlistController.getUserWishlist);
userRouter.post('/wishlist', userProtect, wishlistController.createWishlist);
userRouter.delete('/wishlist', userProtect, wishlistController.deleteWishlist);

userRouter.get('/banners', userUnProtect, bannerController.getAllBanners)

userRouter.get('/coupons', userProtect, couponController.getAvailableCoupons)
userRouter.post('/coupons', userProtect, couponController.applyCoupon)

userRouter.get('/wallet', userProtect, userController.walletDetails)

userRouter.get('/messages/receivers', userProtect, messageContoller.getReceivers)
userRouter.get('/messages', userProtect, messageContoller.getMessages)
userRouter.post('/messages', userProtect, messageContoller.sendMessage)





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
