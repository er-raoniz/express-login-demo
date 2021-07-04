const express = require('express');
const router = express.Router();

// controller
const login = require('../controllers/loginController');
const register = require('../controllers/registerController');
const userList = require('../controllers/userListController');

// POST users' login
router.post('/login', login);
// POST users' registration
router.post('/register', register);
// GET users' listing
router.get('/list', userList);

module.exports = router;