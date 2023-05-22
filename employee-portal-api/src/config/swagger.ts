import { Application, Express, Request, Response } from "express";
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsDoc.Options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:'Employee Employer Rest API Docs',
            version:"1.0.0"
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        },
        security:[{
            bearerAuth:[]
        }]
    },
    apis:["./src/routes/*.ts","./src/schema/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app:Application,port:number){
    //swagger page
    app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

    //DOCS in JSON format
    app.get('docs.json',(req:Request,res:Response)=>{
        res.header('Content-Type','application/json')
        res.send(swaggerSpec)
    })

    console.log(`Docs availbale at http://localhost:${port}/docs`)
}

export default swaggerDocs