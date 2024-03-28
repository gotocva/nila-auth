
const mongoose = require('mongoose');
const authConfig = require('./config/auth-config');
const router = require('./routes');

/**
 * 
 * @param {*} app 
 * @param {*} opts 
 * @returns 
 */
const auth = async (app, opts = {}) => {

    Object.keys(opts).forEach(function(key) {
        authConfig.setEnv(key, opts[key]);
    });
    
    connectMongodb();
    app.use('/api/v1/auth', router);
    
    return app;
}

/**
 *
 * @returns {Promise<Connection>}
 */
const connectMongodb = async () => {
    // Connect to MongoDB using mongoose
    mongoose.connect(authConfig.env.MONGODB_URL, {});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb connection error: on nila auth package'));
    db.once('open', function () {
        console.log('Nila auth: Connected to MongoDB');
    });
    return db;
}

module.exports = {
    auth
};