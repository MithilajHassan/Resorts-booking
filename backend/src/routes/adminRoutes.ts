import { Router } from "express"
import adminController from "../controllers/adminController"


const adminRouter = Router()

adminRouter.post('/signout',adminController.signout)
adminRouter.get('/list-categories',adminController.listCategories)
adminRouter.post('/add-category',adminController.addCategory)
adminRouter.put('/edit-category/:id',adminController.editCategory)
adminRouter.put('/delete-category',adminController.deleteCategory)


export default adminRouter