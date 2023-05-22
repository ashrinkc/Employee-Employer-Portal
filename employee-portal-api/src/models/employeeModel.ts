import { model, Schema } from "mongoose"

interface Employee{
    Email:string,
    EmployeeName:string,
    Position:string,
    Address:string,
    Phone:string,
    Gender:string,
    Salary:string,
}

const employeeSchema = new Schema({
    Email:{
        type:String,
        required:true
    },
    EmployeeName:{
        type:String,
        required:true,
    },
    Position:{
        type:String,
    },
    Address:{
        type:String,
    },
    Phone:{
        type:String,
    },
    Gender:{
        type:String,
    },
    Salary:{
        type:String,
    }
})

const Employee = model<Employee>('Employee',employeeSchema)
export default Employee