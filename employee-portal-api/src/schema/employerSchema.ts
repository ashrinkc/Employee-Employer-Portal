import Joi from 'joi'

/**
 * @openapi
 * components:
 *  schemas:
 *      EmployerInput:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *      EmployerResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              _id:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 */
export const employerSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().required()
})