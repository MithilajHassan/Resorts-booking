import { Request, Response } from "express"
import CustomError from "../errors/customError"
import adminServices from "../services/adminServices"


class AdminController {

    async signout(req:Request,res:Response){
        try {       
            res.cookie('Ajwt','',{
                httpOnly:true,
                expires:new Date(0),
            })
            
            res.status(200).json({message:"You are signed out",success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async addCategory(req:Request,res:Response){
        try {       
            const { category } = req.body
            const categoryDetails = await adminServices.addCategory(category)
            res.status(200).json({category:categoryDetails,success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async listCategories(req:Request,res:Response){
        try {       
            const categories = await adminServices.listCategories()
            
            res.status(200).json(categories)
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }
    async deleteCategory(req:Request,res:Response){
        try {       
            const { id } = req.body
            const result = await adminServices.deleteCategory(id)
            if(result.acknowledged){
                res.status(200).json({success:true})
            }else{
                res.status(400).json({success:false})
            }
        } catch (err) {
            if(err instanceof CustomError){
                console.log(err)
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async editCategory(req:Request,res:Response){
        try {       
            const { id } = req.params
            const { category } = req.body
            const result = await adminServices.editCategory(id,category)
            if(result.acknowledged){
                res.status(200).json({success:true})
            }else{
                res.status(400).json({success:false})
            }
        } catch (err) {
            if(err instanceof CustomError){
                console.log(err)
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

//---------------------- facility Management -----------------------------------//
    
    async addFacility(req:Request,res:Response){
        try {       
            const { facilityName } = req.body
            const facilityDetails = await adminServices.addFacility(facilityName)
            res.status(200).json({facility:facilityDetails,success:true})
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }
    
    async listfacilities(req:Request,res:Response){
        try {       
            const facilities = await adminServices.listfacilities()
            
            res.status(200).json(facilities)
        } catch (err) {
            if(err instanceof CustomError){
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async deleteFacility(req:Request,res:Response){
        try {       
            const { id } = req.params
            const result = await adminServices.deleteFacility(id)
            if(result.acknowledged){
                res.status(200).json({success:true})
            }else{
                res.status(400).json({success:false})
            }
        } catch (err) {
            if(err instanceof CustomError){
                console.log(err)
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    async editFacility(req:Request,res:Response){
        try {       
            const { id } = req.params
            const { facilityName } = req.body
            
            const result = await adminServices.editFacility(id,facilityName)
            if(result.acknowledged){
                res.status(200).json({success:true})
            }else{
                res.status(400).json({success:false})
            }
        } catch (err) {
            if(err instanceof CustomError){
                console.log(err)
                res.status(err.statusCode).json({ message: err.message })
            }else {
                console.error(err)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

}

export default new AdminController