const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const { transactionCreationValidation, transactionIdValidation, validate } = require('../utils/validators');
const { authenticate } = require('../middleware/authMiddleware');

// No authentication, but validation added
router.post('/create', authenticate, transactionCreationValidation, validate, TransactionController.createTransaction);
router.get('/:id', authenticate, transactionIdValidation, validate, TransactionController.getTransactionById);
router.post('/pay/:id', authenticate, transactionIdValidation, validate, TransactionController.payTransaction);
router.delete('/:id', authenticate, transactionIdValidation, validate, TransactionController.deleteTransaction);

module.exports = router;