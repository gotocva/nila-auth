const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    authentication_token: {
        type: String,
        unique: true
    },
    otp: {
        type: Number,
        default: 0
    },
    email_verified: {
        type: Number,
        enum : [0, 1],
        default: 0
    },
    profile: {
        type: Object
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
});

userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
    try {
        const obj = Object.assign({}, this);
        // this.authentication_token = jwt.sign(obj._doc.email, options.JWT_SECRET);
        // this.password = await bcrypt.hash(this.password, Number(options.BCRYPT_SALT_ROUND));
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('users', userSchema);

module.exports = {
    User
};