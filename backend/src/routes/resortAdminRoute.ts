import { Router } from "express"
import resortAdminController from "../controllers/resortAdminController"


const resortAdminRouter = Router()

resortAdminRouter.post('/signout',resortAdminController.signout)



export default resortAdminRouter