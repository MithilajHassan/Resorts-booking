import { Router } from "express"
import adminController from "../controllers/adminController"


const adminRouter = Router()

adminRouter.post('/signout',adminController.signout)



export default adminRouter