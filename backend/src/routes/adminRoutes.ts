import { Router } from "express"
import adminController from "../controllers/adminController"
import { adminProtect } from "../middleware/auth"


const adminRouter = Router()

adminRouter.post('/signout', adminProtect, adminController.signout)

//---------------------- Category Management -----------------------------------//
adminRouter.get('/categories', adminProtect, adminController.listCategories)
adminRouter.post('/categories', adminProtect, adminController.addCategory)
adminRouter.put('/categories/:id', adminProtect, adminController.editCategory)
adminRouter.patch('/categories/:id/soft-delete', adminProtect, adminController.deleteCategory)

//---------------------- Facility Management -----------------------------------//
adminRouter.get('/facilities', adminProtect, adminController.listfacilities)
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





export default adminRouter