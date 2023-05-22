import { model, Schema } from "mongoose"

interface Admin{
    username:string,
    password:string
}

const adminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Admin = model<Admin>('Admin',adminSchema)
export default Admin