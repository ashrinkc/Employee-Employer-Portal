import { model, Schema } from "mongoose";

interface Employer {
    name:string,
    email:string
}

const employerSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }
})

const Employer = model<Employer>('Employer',employerSchema)
export default Employer