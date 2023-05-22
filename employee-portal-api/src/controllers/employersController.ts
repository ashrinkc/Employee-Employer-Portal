import { Request, Response } from "express";
import Employer from "../models/employerModel";
import { OAuth2Client } from "google-auth-library";
import passport from 'passport'


export const employerLogin = async(req:Request,res:Response)=>{
   try{
    const employerEmail = await Employer.findOne({email:req.body.email})
    if(employerEmail){
        res.status(200).send(employerEmail)
    }else{
        res.status(404).send({success:false,message:"No such user has been added by the admin"})
    }
}catch(err){
    console.log(err)
        res.sendStatus(500)
}
    
}

export const addEmployer = async(req:Request,res:Response)=>{
    try{
        const employer = await Employer.create(req.body)
        res.status(200).send(employer)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getEmployer = async(req:Request,res:Response) =>{
    try{
        const employer = await Employer.find()
        res.status(200).send(employer)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
