// scripts/initSuperAdmin.js
const mongoose = require('mongoose');
const SuperAdmin = require('../models/SuperAdmin');
require('dotenv').config();

const initSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if super admin already exists
    const existingAdmin = await SuperAdmin.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
    
    if (!existingAdmin) {
      // Create initial super admin
      const superAdmin = new SuperAdmin({
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        phone: process.env.SUPER_ADMIN_PHONE || ''
      });
      
      await superAdmin.save();
      console.log('Super admin created successfully');
    } else {
      console.log('Super admin already exists');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
};

initSuperAdmin();