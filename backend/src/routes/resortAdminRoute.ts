import { Router } from "express"
import resortAdminController from "../controllers/resortAdminController"
import adminController from "../controllers/adminController"


const resortAdminRouter = Router()

resortAdminRouter.post('/register', resortAdminController.register)
resortAdminRouter.post('/signin', resortAdminController.signin)
resortAdminRouter.post('/signout', resortAdminController.signout)
resortAdminRouter.get('/categories', adminController.listCategories)
resortAdminRouter.get('/facilities', adminController.listfacilities)





export default resortAdminRouter