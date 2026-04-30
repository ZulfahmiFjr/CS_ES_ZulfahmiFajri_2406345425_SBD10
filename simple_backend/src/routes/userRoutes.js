const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { userRegistrationValidation, userUpdateValidation, validate } = require('../utils/validators');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userRegistrationValidation, validate, UserController.register);
router.post('/login', UserController.login);

// Protected routes (sekarang udh pake JWT)
router.put('/update', authenticate, userUpdateValidation, validate, UserController.updateProfile);
router.get('/history', authenticate, UserController.getTransactionHistory);
router.get('/total-spent', authenticate, UserController.getTotalSpent);
router.get('/:email', authenticate, UserController.getUserByEmail);

module.exports = router;