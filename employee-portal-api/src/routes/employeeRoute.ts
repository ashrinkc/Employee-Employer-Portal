import { Router } from "express";
import checkEmployeeUpdate, { validateRequestBody } from "../config/middlewares";
import { deleteEmployee, employeeLogin, employeeRegister, getAllEmployee, getEmployee, updateEmployee, uploadEmployee } from "../controllers/employeeController";
import { employeeSchema } from "../schema/employeeSchema";


const employeeRoute = Router()

/**
* @openapi
* /api/employee/getAllEmployees:
*   get:
*       tags:
*       - Employee
*       description: Get all employees
*       responses:
*           200:
*               description: OK
*           500:
*               description: Internal server error
*/
employeeRoute.get('/getAllEmployees',getAllEmployee)

/**
* @openapi
* /api/employee/getEmployee/{id}:
*   get:
*       tags:
*       - Employee
*       description: Get individual employee
*       parameters:
*        - name: id
*          in: path
*          description: id of the employee
*          required: true
*       responses:
*           200:
*               description: OK
*           500:
*               description: Internal server error
*/
employeeRoute.get('/getEmployee/:id',getEmployee)

/**
* @openapi
* /api/employee/registerEmployees:
*   post:
*       tags:
*       - Employee
*       description: Add an employee
*       requestBody:
*           required: true
*           contents:
*               application/json:
*               schema:
*                   $ref: '#/components/schemas/EmployeeInput'
*       responses:
*           200:
*               description: Success
*               content:
*                   application/json:
*                   schema:
*                       $ref: '#/components/schemas/EmployeeResponse'
*           500:
*               description: Internal server error
*               
*/
employeeRoute.post('/registerEmployees',validateRequestBody(employeeSchema), employeeRegister)

/**
 * @openapi
 * paths:
 *  '/api/employees/{id}':
 *    put:
 *      tags:
 *        - Employee
 *      description: Update employee information
 *      parameters:
 *        - name: id
 *          in: path
 *          description: id of the employee
 *          required: true
 *      responses: 
 *        200:
 *          description: Success
 *        401:
 *          description: Unauthorized user
 *        500:
*           description: Internal server error
 *        
 */
employeeRoute.put('/:id',checkEmployeeUpdate, updateEmployee)

/**
* @openapi
* /api/employee/uploadEmployee:
*   post:
*       tags:
*       - Employee
*       description: upload employees in bulk
*       responses:
*           200:
*               description: Success
*           500:
*               description: Internal server error
*               
*/
employeeRoute.post('/uploadEmployee',uploadEmployee)

/**
* @openapi
* /api/employee/loginEmployee:
*   post:
*       tags:
*       - Employee
*       description: Employee login 
*       requestBody:
*           required: true
*           contents:
*               application/json:
*               schema:
*                   $ref: '#/components/schemas/EmployeeInput'
*       responses:
*           200:
*               description: Success
*               content:
*                   application/json:
*                   schema:
*                       $ref: '#/components/schemas/EmployerResponse'
*           500:
*               description: Internal server error
*           404:
*               description: Employee not found
*           401:
*               description: Error authenticating
*/
employeeRoute.post('/loginEmployee',validateRequestBody(employeeSchema),employeeLogin)

/**
* @openapi
* /api/employee/{id}:
*   delete:
*       tags:
*       - Employee
*       description: Delete employee
*       parameters:
*        - name: id
*          in: path
*          description: id of the employee
*          required: true
*       responses:
*           200:
*               description: OK
*           500:
*               description: Internal server error
*/
employeeRoute.delete('/:id',deleteEmployee)
export default employeeRoute