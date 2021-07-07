const express = require('express');
const router = express.Router();

// controller
const login = require('../controllers/loginController');
const register = require('../controllers/registerController');
const userList = require('../controllers/userListController');

// validator
const authenticator = require('../middlewares/authenticator');
const { listRules, loginRules, registerRules, validate } = require('../middlewares/validator');

// GET users' listing
router.get('/list', listRules(), authenticator, validate, userList);
// POST users' login
router.post('/login', loginRules(), validate, login);
// POST users' registration
router.post('/register', registerRules(), validate, register);

module.exports = router;