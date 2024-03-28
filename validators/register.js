const Joi = require('joi');
const { sendErrorResponse } = require('../utils/response');

/**
 * 
 */
const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string().min(8).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    meta: Joi.any()
});

/**
 * Register request middleware to validate request payload passed in register API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const registerRequest = async (req, res, next) => {
    const { error } = await schema.validate(req.body);
    const valid = error == null || undefined; 
    if (!valid) { 
        return sendErrorResponse(res, {
            message: error['details'][0].message.replace(/[^a-zA-Z ]/g, "") || `Invalid request`,
            error: error['details']
        })
    } else { 
        next();
    }
}

module.exports = {
    registerRequest
};