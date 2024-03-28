const { User } = require("../models/user")
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response")


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const emailVerify = async (req, res) => {

    const user = await User.findOne({email: req.body.email}).catch((error) => {
                    return sendErrorResponse(res, { message: 'Email not exists'});
                });
    if (user.otp == req.body.otp) {
        user.email_verified = 1;
        await user.save();
        return sendSuccessResponse(res, { message: 'Email verified successfully'});
    } else {
        return sendErrorResponse(res, { message: 'Invalid OTP'});
    }

}


module.exports = {
    emailVerify
}