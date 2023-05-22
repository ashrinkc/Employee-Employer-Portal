import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import Employer from "../models/employerModel";

async function checkEmployeeUpdate(req:Request,res:Response,next:NextFunction){
    const id = req.body.id
    const user = await Employer.findById(id)
    if(req.body.Position || req.body.Salary){
        if(!user){
        console.log("not authorized")
         return res.status(401).send({ error: 'You are not authorized to change salary or title' });
    }
    }
    next()
}

export const validateRequestBody = (schema:Schema) => (req:Request,res:Response,next:NextFunction)=>{
    const value = schema.validate(req.body,{abortEarly: false})
    const {error} = value
    if (error) {
    return res.status(422).json({
      message: 'The request body validation failed.',
      details: error.details,
    })
  }
  req.body = value.value // Allows the default values assigned in Joi schema to be accepted
  return next()
}

export default checkEmployeeUpdate