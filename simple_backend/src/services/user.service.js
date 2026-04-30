const User = require('../models/user.model');
const { AppError } = require('../middleware/errorHandler');
const Transaction = require('../models/transaction.model');
const bcrypt = require('bcrypt'); // ini buat manggil bcryptnya

class UserService {
  static async register({ name, username, email, phone, password }) {
    // Check if user already exists by email
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      throw new AppError('User with this email already exists', 400);
    }
    // Note: username uniqueness is enforced by database constraint
    // hash passwordnya pake bcrypt sebelum disimpen
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // No hashing, store plain text password (insecure)
    const user = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword, // simpen password yg udah dihash
    });

    return user;
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Compare plain text passwords (insecure)
    // bandingin password pakai bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw new AppError('Invalid email or password', 401);
    }

    // No JWT, just return user data
    return { user: { id: user.id, name: user.name, username: user.username, email: user.email, phone: user.phone, balance: user.balance } };
  }

  static async updateProfile(id, updateData) {
    // kaloo misalnya updateData ada passwordnya, hash juga biar aman
    if(updateData.password){
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    // No password hashing
    const updatedUser = await User.update(id, updateData);
    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }
    return updatedUser;
  }

  static async getTransactionHistory(userId) {
    // panggil fungsi findByUserId yg udah dikasih JOIN
    const transactions = await Transaction.findByUserId(userId);
    return transactions;
  }

  static async getTotalSpent(userId) {
    // panggil fungsi getTotalSpentByUserId yg pakai agregasi
    const total = await Transaction.getTotalSpentByUserId(userId);
    return total;
  }
  
  static async getUserByEmail(email) {
    const user = await User.findByEmail(email);
    if(!user) throw new AppError('User not found', 404); 
    return user;
  }
}

module.exports = UserService;