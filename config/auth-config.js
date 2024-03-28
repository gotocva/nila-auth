class AuthConfig { 

    config = {};
    env = {
        MONGODB_URL: 'mongodb://localhost:27017/boilerplate',
        JWT_SECRET: '25051995',
        BCRYPT_SALT_ROUND: '12',
        SMTP_HOST: 'smtp.zoho.com',
        SMTP_PORT: 587,
        SMTP_EMAIL: 'contact@sivabharathy.in',
        SMTP_PASSWORD: ''
    };

    setConfig = (config) => {
        this.config = config;
    }

    loadEnv = (env) => {
        this.env = env;
    }

    setEnv = (key, value) => {
        this.env[key] = value;
    }

}

const authConfig = new AuthConfig();

module.exports = authConfig;