const { User } = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authConfig = require('../config/auth-config');
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const register = async (req, res) => {

    const userValidation = await User.findOne({ email: req.body.email }).select({_id:1}).exec();

    if (userValidation) {
        return sendErrorResponse(res, { message: 'Email id already exists', statusCode: 400 });
    }

    req.body.authentication_token = jwt.sign(req.body.email, authConfig.env.JWT_SECRET);
    req.body.password = await bcrypt.hash(req.body.password, Number(authConfig.env.BCRYPT_SALT_ROUND));

    req.body.profile = req.body.meta
    const user = new User(req.body);

    await user.save();

    return sendSuccessResponse(res, {
        message: 'New user account created successfully',
        data: req.body
    });
}


module.exports = {
    register
}