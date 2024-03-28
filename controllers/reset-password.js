const authConfig = require("../config/auth-config");

const bcrypt = require('bcrypt');
const { User } = require("../models/user");
const { sendSuccessResponse } = require("../utils/response");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const resetPassword = async (req, res) => {

    req.body.password = await bcrypt.hash(req.body.password, Number(authConfig.env.BCRYPT_SALT_ROUND));

    await User.findOneAndUpdate({$and: [{ email: req.body.email}, {otp: req.body.otp }]}, { $set: { password: req.body.password} }).exec();

    return sendSuccessResponse(res, {
        message: 'Password updated successfully'
    });
}


module.exports = {
    resetPassword
}