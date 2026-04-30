const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return next(new AppError('Token hilang atau tidak valid', 401));
  }
  const token = authHeader.split(' ')[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpen data payload (userId, email) ke req.user
    next();
  }catch (error){
    return next(new AppError('Token hilang atau tidak valid', 401));
  }
};

module.exports = { authenticate };