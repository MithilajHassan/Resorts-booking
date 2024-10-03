import { NextFunction, Request, Response } from "express"
import CustomError from "../errors/customError"

const errorHandler = (err:unknown,req:Request,res:Response)=>{
    if (err instanceof CustomError) {      
        res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        });
    } else if (err instanceof Error) {
        res.status(500).json({
            message: err.message || 'Internal Server Error',
            statusCode: 500,
        })
    } else {
        console.log("fromfdsfs")
        res.status(500).json({
            message: 'Unknown Error',
            statusCode: 500,
        })
    }
}

export default errorHandler