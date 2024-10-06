import { Router } from "express"
import adminController from "../controllers/adminController"


const adminRouter = Router()

adminRouter.post('/signout',adminController.signout)
//---------------------- Category Management -----------------------------------//
adminRouter.get('/list-categories',adminController.listCategories)
adminRouter.post('/add-category',adminController.addCategory)
adminRouter.put('/edit-category/:id',adminController.editCategory)
adminRouter.put('/delete-category',adminController.deleteCategory)

//---------------------- facility Management -----------------------------------//
adminRouter.get('/list-facilities',adminController.listfacilities)
adminRouter.post('/add-facility',adminController.addFacility)
adminRouter.put('/edit-facility/:id',adminController.editFacility)
adminRouter.put('/delete-facility/:id',adminController.deleteFacility)



export default adminRouter