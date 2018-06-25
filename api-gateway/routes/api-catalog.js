//API ROUTES

var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var checkToken = require('../check-token');


//POST request for registering a user
router.post('/auth/register',
auth_controller.user_register);

//GET request for verifying user tokens *updated for ex 8.4*
router.get('/auth/token',
checkToken,
auth_controller.user_token);
module.exports = router;

//allows user login requests
router.post('/auth/login', auth_controller.user_login);

//allows user logout requests
router.get('/auth/logout', auth_controller.user_logout);