const { body, param, query } = require('express-validator');

// TODO: Buat pola regex untuk validasi berikut (jangan gunakan pola yang diberikan di completed_backend).
// Email: harus valid (misal: user@domain.com).
// Password: minimal 10 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial.
// Username: hanya boleh mengandung huruf, angka, dan underscore (3-20 karakter).
// Phone: format internasional (opsional, dapat dimulai dengan +, diikuti digit, spasi, atau strip).
// Description: opsional, bebas tetapi batasi panjang (misal maksimal 500 karakter).

// Validation rules
const userRegistrationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    // TODO: tambahkan validasi regex untuk username (hanya huruf, angka, underscore)
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya boleh huruf, angka, dan underscore'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    // TODO: tambahkan validasi regex untuk email
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Email tidak valid'),
  body('phone')
    .optional()
    .trim()
    // TODO: tambahkan validasi regex untuk phone (format internasional)
    .matches(/^(\+?[\d\s-]+)?$/).withMessage('Format nomor telepon tidak valid'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    // TODO: tambahkan validasi regex untuk password
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/).withMessage('Password minimal 10 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial'),
];

const userUpdateValidation = [
  body('id')
    .isInt().withMessage('User ID must be an integer').toInt(),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    // TODO: validasi regex untuk username
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya boleh huruf, angka, dan underscore'),
  body('email')
    .optional()
    .trim()
    // TODO: validasi regex untuk email
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Email tidak valid'),
  body('phone')
    .optional()
    .trim()
    // TODO: validasi regex untuk phone
    .matches(/^(\+?[\d\s-]+)?$/).withMessage('Format nomor telepon tidak valid'),
  body('password')
    .optional()
    .trim()
    // TODO: validasi regex untuk password
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/).withMessage('Password minimal 10 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial'),
  body('balance')
    .optional()
    .isInt({ min: 0 }).withMessage('Balance must be a non-negative integer').toInt(),
];

const transactionCreationValidation = [
  body('user_id')
    .isInt().withMessage('User ID must be an integer').toInt(),
  body('item_id')
    .isInt().withMessage('Item ID must be an integer').toInt(),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer').toInt(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters'),
];

const transactionIdValidation = [
  param('id')
    .isInt().withMessage('Transaction ID must be an integer').toInt(),
];

const validate = (req, res, next) => {
  const errors = require('express-validator').validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      message: messages.join('. '),
      payload: null,
    });
  }
  next();
};

module.exports = {
  // emailRegex, passwordRegex, phoneRegex dihapus
  userRegistrationValidation,
  userUpdateValidation,
  transactionCreationValidation,
  transactionIdValidation,
  validate,
};