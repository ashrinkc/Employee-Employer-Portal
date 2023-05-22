import { Application, Request, Response } from "express";
import adminRouter from "./adminRoute";
import employeeRoute from "./employeeRoute";
import employerRoute from "./employerRoute";

const routesSetup = (app:Application) =>{
    app.get('/',(req:Request,res:Response)=>res.send("welcome"))
    app.use('/api/admin',adminRouter)
    app.use('/api/employer',employerRoute)
    app.use('/api/employee',employeeRoute)
}

export default routesSetup;