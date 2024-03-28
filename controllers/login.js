
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth-config');
const { UserSession } = require('../models/user-session');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {

    
    const user = await User.findOne({ email: req.body.email }).select({ _id: 1, password: 1, authentication_token: 1, status: 1}).exec();

    if (!user) {
        return sendErrorResponse(res, { message: 'Email id not exists', statusCode: 400 });
    }

    if (user.status == 0) {
        return sendErrorResponse(res, { message: 'Your account is suspended', statusCode: 400 });
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err){
          // handle error
          return sendErrorResponse(res, { message: 'Invalid password', statusCode: 400 });
        }
        if (result) {
          // credentials authentication completed need to create or update session
          sessionHandler(req, res, user);
        } else {
          // response is OutgoingMessage object that server response http request
          return sendErrorResponse(res, { message: 'passwords do not match', statusCode: 400 });
        }
    });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
const sessionHandler = async (req, res, user) => {

    // create a new session 

    const session = {
        user_id: user._id,
        session_token: jwt.sign({email:user.email, _id: user._id}, authConfig.env.JWT_SECRET)
    }

    const userSession = new UserSession(session);

    await userSession.save();

    return sendSuccessResponse(res, {
        message: 'User logged in successfully',
        data: { 
            authentication_token: user.authentication_token,
            session_token: userSession.session_token, 
            user_id: userSession.user_id 
        }
    })

}


module.exports = {
    login
}