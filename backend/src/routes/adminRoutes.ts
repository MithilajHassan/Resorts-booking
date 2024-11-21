import { Router } from "express"
import adminController from "../controllers/adminController"
import { adminProtect } from "../middleware/auth"
import bannerController from "../controllers/bannerController"
import couponController from "../controllers/couponController"


const adminRouter = Router()

adminRouter.post('/signout', adminProtect, adminController.signout)
// adminRouter.get('/verifyadmin', adminProtect, userController.verifyUser)

//---------------------- Category Management -----------------------------------//
adminRouter.get('/categories', adminProtect, adminController.listCategories)
adminRouter.post('/categories', adminProtect, adminController.addCategory)
adminRouter.put('/categories/:id', adminProtect, adminController.editCategory)
adminRouter.patch('/categories/:id/soft-delete', adminProtect, adminController.deleteCategory)

//---------------------- Facility Management -----------------------------------//
adminRouter.get('/facilities', adminProtect, adminController.listFacilities)
adminRouter.post('/facilities', adminProtect, adminController.addFacility)
adminRouter.put('/facilities/:id', adminProtect, adminController.editFacility)
adminRouter.patch('/facilities/:id/soft-delete', adminProtect, adminController.deleteFacility)

//---------------------- Resort Management -----------------------------------//
adminRouter.get('/resorts', adminProtect, adminController.listResorts)
adminRouter.patch('/resorts/:id/accept', adminProtect, adminController.acceptResort)
adminRouter.patch('/resorts/:id/reject', adminProtect, adminController.rejectResort)
adminRouter.patch('/resorts/:id/manage-block', adminProtect, adminController.manageResortBlock)

//---------------------- User Management -----------------------------------//
adminRouter.get('/users', adminProtect, adminController.listUsers)
adminRouter.patch('/users/:id/manage-block', adminProtect, adminController.manageUserBlock)

//---------------------- Banner Management -----------------------------------//
adminRouter.get('/banners', adminProtect, bannerController.getAllBanners)
adminRouter.post('/banners', adminProtect, bannerController.createBanner)
adminRouter.put('/banners/:id', adminProtect, bannerController.editBanner)
adminRouter.delete('/banners/:id', adminProtect, bannerController.deleteBannerById)

//------------------------- Coupon Management --------------------------------//
adminRouter.get('/coupons', adminProtect, couponController.getAllCoupons)
adminRouter.post('/coupons', adminProtect, couponController.createCoupon)
adminRouter.put('/coupons/:id', adminProtect, couponController.updateCoupon)
adminRouter.delete('/coupons/:id', adminProtect, couponController.deleteCoupon)




export default adminRouter