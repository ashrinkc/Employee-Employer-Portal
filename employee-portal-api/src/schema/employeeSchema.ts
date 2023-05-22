import Joi from 'joi';

/**
 * @openapi
 * components:
 *  schemas:
 *      EmployeeInput:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              position:
 *                  type: string
 *              address:
 *                  type: string
 *              phone:
 *                  type: string
 *              gender:
 *                  type: string
 *              salary:
 *                  type: string
 *      EmployeeResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              position:
 *                  type: string
 *              address:
 *                  type: string
 *              phone:
 *                  type: string
 *              gender:
 *                  type: string
 *              salary:
 *                  type: string
 *              _id:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 */
export const employeeSchema = Joi.object({
    Email: Joi.string().required(),
    EmployeeName: Joi.string().optional(),
    Position: Joi.string().optional(),
    Address: Joi.string().optional(),
    Phone: Joi.string().optional(),
    Gender: Joi.string().optional(),
    Salary: Joi.string().optional(),
})