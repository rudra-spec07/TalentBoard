import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../modules/auth/models/user.model.js';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/talentboardx';
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Run database schema migration for legacy users (Phase 1 -> Phase 2 compatibility)
    const usersCollection = mongoose.connection.db.collection('users');
    const legacyUsers = await usersCollection.find({ name: { $exists: true } }).toArray();
    
    if (legacyUsers.length > 0) {
      console.log(`[MIGRATION] Found ${legacyUsers.length} legacy user records to migrate...`);
      for (const legacyUser of legacyUsers) {
        const rawName = (legacyUser.name || '').trim();
        const nameParts = rawName.split(/\s+/);
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || 'User';
        
        await usersCollection.updateOne(
          { _id: legacyUser._id },
          {
            $set: {
              firstName,
              lastName,
              isActive: legacyUser.status === 'active' || legacyUser.isActive !== false
            },
            $unset: {
              name: '',
              status: ''
            }
          }
        );
        console.log(`[MIGRATION] Successfully migrated legacy account: ${legacyUser.email} (${firstName} ${lastName})`);
      }
    }

    // Seed default admin account if configured in env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
          firstName: 'System',
          lastName: 'Administrator',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          isActive: true,
          isVerified: true
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

export default connectDB;
