import { Response, Request } from "express";
import Employee from "../models/employeeModel";
import papaparse from 'papaparse'
import Bull,{Job,Queue} from 'bull'
import jwt from 'jsonwebtoken'

const queue = new Bull('employee-bulk-upload');
queue.process(async function(job,done){
    try{
        console.log(job.data)
        await Employee.insertMany(job.data)
        done()
    }catch(err){
        console.log(err)
    }
})

queue.on('completed', (job: Job) => {
  console.log(`Completed ${job.id} Job`)
})

export const getAllEmployee = async(req:Request,res:Response) =>{
    try{
        const Employees = await Employee.find({})
        res.send(Employees)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export const getEmployee = async(req:Request,res:Response) =>{
    try{
        const IEmployee = await Employee.findById(req.params.id)
        res.send(IEmployee)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export const updateEmployee = async(req:Request,res:Response) =>{
    try{
        await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send({success:true,message:"User successfully updated"})
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export const deleteEmployee = async(req:Request,res:Response) => {
    try{
        await Employee.findByIdAndDelete(req.params.id)
        res.send({success:true,message:"User successfully deleted"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const employeeRegister = async(req:Request,res:Response)=>{
    try{
        const employee = await Employee.create(req.body)
        res.status(200).send(employee)
    }catch(err){
         console.log(err)
        res.sendStatus(500)
    }
}

const JWT_SECRET = `${process.env.JWT_SECRET}`

export const employeeLogin = async(req:Request,res:Response)=>{
    try{
        const {Email} = req.body
        Employee.findOne({Email},(err:Error|null,employee:any)=>{
            if(err){
                res.status(401).send({success:false,message:'Error authenticating employee'});
                return;
            }
            if(!employee){
                res.status(404).send({success:false,message:'Invalid username'});
                return;
            }
             const token = jwt.sign({Email:employee.Email},JWT_SECRET)
            res.status(200).send({success:true,token,employee})
        })
    }catch(err){
         console.log(err)
        res.sendStatus(500)
    }
}

export const uploadEmployee = async(req:Request,res:Response) =>{
    try{

        const data = papaparse.parse(req.body.csvData,{
            header: true
        }).data;
        //add data to job queue
        queue.add(data)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}