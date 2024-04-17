// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');
const authenticationMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');



// Public routes
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/send-reset-code', AuthController.sendResetCode);
router.post('/verify-reset-code', AuthController.checkresetCode);
router.post('/reset-password', AuthController.resetPassword);

// Protected routes (require authentication middleware)
router.use(authenticationMiddleware.authenticateUser);
router.use(checkRole('admin'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/add', userController.addUser);
router.put('/update/:id', userController.updateUserData);
router.delete('/remove/:id', userController.removeUser);



module.exports = router;

