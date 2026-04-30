const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model'); 
const { AppError } = require('../middleware/errorHandler');

router.post('/login', async (req, res, next) => {
  try{
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if(!user){
      throw new AppError('Email atau password tidak valid', 401);
    }
    console.log("Password ketikan dari React:", password);
    console.log("Password hash di database:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw new AppError('Email atau password tidak valid', 401);
    }
    // bikin JWT token dengan payload userId, email, sama expired 24 jam
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({
      success: true,
      message: 'Login successful',
      payload: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          balance: user.balance
        }
      }
    });
  }catch (error){
    next(error);
  }
});

module.exports = router;