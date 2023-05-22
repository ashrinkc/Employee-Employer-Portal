import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connect from './config/dbconnection';
import routesSetup from './routes';
import swaggerDocs from './config/swagger';
import dotenv from 'dotenv'
const configureApplication = async() =>{
    dotenv.config()
    await connect()
    const app : Application = express();
    app.use(cors())
    app.use(express.json())
    app.listen(5000,()=>{
        console.log("Server is running")
        swaggerDocs(app,5000)
    })
    routesSetup(app)
    return app
}

configureApplication()

