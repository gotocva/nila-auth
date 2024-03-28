
const express = require('express');

const { register } = require('./controllers/register');
const { login } = require('./controllers/login');
const { resetPassword } = require('./controllers/reset-password');
const { users } = require('./controllers/users');
const { profile } = require('./controllers/profile');
const { registerRequest } = require('./validators/register');


const router = express.Router();

router.get('/info', (req, res) => {
    return res.json({message:'Nila auth package implementation'});
});

router.post('/register', [ registerRequest ], register);
router.post('/login', [], login);
router.post('/reset-password', [], resetPassword);
router.get('/users', [], users);
router.put('/users/:id', [], profile);

module.exports = router;