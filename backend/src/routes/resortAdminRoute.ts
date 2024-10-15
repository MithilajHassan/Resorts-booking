import { Router } from "express"
import resortAdminController from "../controllers/resortAdminController"
import adminController from "../controllers/adminController"
import { resortProtect } from "../middleware/auth"


const resortAdminRouter = Router()

resortAdminRouter.post('/register', resortAdminController.register)
resortAdminRouter.post('/signin', resortAdminController.signin)
resortAdminRouter.post('/signout', resortProtect, resortAdminController.signout)
resortAdminRouter.get('/categories', resortProtect, adminController.listCategories)
resortAdminRouter.get('/facilities', resortProtect, adminController.listFacilities)
resortAdminRouter.get('/myresort/:id', resortProtect, resortAdminController.getMyResort)
resortAdminRouter.put('/myresort/:id', resortProtect, resortAdminController.editResort)
resortAdminRouter.get('/rooms/:resortId', resortProtect, resortAdminController.getRoomsByResortId)
resortAdminRouter.post('/rooms', resortProtect, resortAdminController.addRoom)





export default resortAdminRouter