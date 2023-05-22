import { Request, Response, Router } from "express";
import { addEmployer, employerLogin, getEmployer } from "../controllers/employersController";
import passport from "passport";
import { validateRequestBody } from "../config/middlewares";
import { employerSchema } from "../schema/employerSchema";
const employerRoute = Router()

/**
* @openapi
* /api/employer/addEmployer:
*   post:
*       tags:
*       - Employer
*       description: Add an employer
*       requestBody:
*           required: true
*           contents:
*               application/json:
*               schema:
*                   $ref: '#/components/schemas/EmployerInput'
*       responses:
*           200:
*               description: Success
*               content:
*                   application/json:
*                   schema:
*                       $ref: '#/components/schemas/EmployerResponse'
*           422:
*               description: Bad request
*           500:
*               description: Internal server error
*               
*/
employerRoute.post('/addEmployer', validateRequestBody(employerSchema), addEmployer)

/**
* @openapi
* /api/employer/getAllEmployer:
*   get:
*       tags:
*       - Employer
*       description: Get all employers
*       responses:
*           200:
*               description: OK
*           500:
*               description: Internal server error
*/
employerRoute.get('/getAllEmployer',getEmployer)

/**
* @openapi
* /api/employer/employerLogin:
*   get:
*       tags:
*       - Employer
*       description: Employer login 
*       responses:
*           200:
*               description: Success
*               content:
*                   application/json:
*                   schema:
*                       $ref: '#/components/schemas/EmployerResponse'
*           500:
*               description: Internal server error
*/
employerRoute.post('/employerLogin', validateRequestBody(employerSchema), employerLogin)
export default employerRoute