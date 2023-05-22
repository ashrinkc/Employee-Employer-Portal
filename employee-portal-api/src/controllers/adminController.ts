import { Request, Response } from "express";
import Admin from "../models/adminModel";
import jwt from 'jsonwebtoken'
const JWT_SECRET = `${process.env.JWT_SECRET}`
export const adminLogin = async(req:Request,res:Response) =>{
    try{
    const {username,password} = req.body
    Admin.findOne({username,password},(err:Error|null,admin:any)=>{
        if(err){
            res.status(401).send({success:false,message:'Error authenticating admin'});
            return;
        }
        if(!admin){
            res.status(404).send({ success: false, message: 'Invalid username or password' });
            return;
        }
        const token = jwt.sign({username:admin.username},JWT_SECRET)
        res.status(200).send({success:true,token})
    })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}