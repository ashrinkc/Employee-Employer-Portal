import { Router } from "express";
import { validateRequestBody } from "../config/middlewares";
import { adminLogin } from "../controllers/adminController";
import { adminSchema } from "../schema/adminSchema";

const adminRouter = Router()

/**
* @openapi
* /api/admin/login:
*   post:
*       tags:
*       - Admin
*       description: Admin login 
*       requestBody:
*           required: true
*           contents:
*               application/json:
*               schema:
*                   $ref: '#/components/schemas/AdminInput'
*       responses:
*           200:
*               description: Success
*               content:
*                   application/json:
*                   schema:
*                       $ref: '#/components/schemas/AdminResponse'
*           500:
*               description: Internal server error
*           404:
*               description: Admin not found
*           401:
*               description: Error authenticating
*/
adminRouter.post('/login',validateRequestBody(adminSchema) ,adminLogin)

export default adminRouter;