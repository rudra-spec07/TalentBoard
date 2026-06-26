const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../modules/auth/models/user.model');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/talentboardx';
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed default admin account if configured in env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
          name: 'System Administrator',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          status: 'active'
        });
        console.log(`[SEED] Default Admin account seeded successfully (${adminEmail})`);
      } else {
        console.log(`[SEED] Admin account verified (${adminEmail})`);
      }
    }
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
