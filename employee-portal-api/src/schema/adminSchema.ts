import Joi from "joi";

/**
 * @openapi
 * components:
 *  schemas:
 *      AdminInput:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *      AdminResponse:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              _id:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 */
export const adminSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})