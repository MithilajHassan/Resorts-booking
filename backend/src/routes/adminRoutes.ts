import { Router } from "express"
import adminController from "../controllers/adminController"


const adminRouter = Router()

adminRouter.post('/signout',adminController.signout)
adminRouter.post('/add-category',adminController.addCategory)
adminRouter.get('/list-categories',adminController.listCategories)


export default adminRouter