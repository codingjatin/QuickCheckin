/**
 * Migration Script: Migrate Legacy Restaurants to Subscription System
 * 
 * Run this ONCE before launching Stripe signup feature.
 * 
 * This script:
 * 1. Finds all restaurants without subscription data
 * 2. Sets them to 'legacy-free' subscription plan
 * 3. Estimates seat capacity from table count
 * 4. Asks Super Admin to verify/update data
 */

const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Table = require('../models/Table');
require('dotenv').config();

async function migrateLegacyRestaurants() {
  try {
    console.log('🔄 Starting legacy restaurant migration...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find all restaurants without subscription data
    const legacyRestaurants = await Restaurant.find({
      subscriptionPlan: { $in: [null, 'legacy-free'] },
      stripeCustomerId: null
    });

    console.log(`Found ${legacyRestaurants.length} legacy restaurants to migrate\n`);

    if (legacyRestaurants.length === 0) {
      console.log('No legacy restaurants found. Migration complete.');
      process.exit(0);
    }

    let migratedCount = 0;

    for (const restaurant of legacyRestaurants) {
      console.log(`\n📍 Processing: ${restaurant.name} (ID: ${restaurant._id})`);

      // Get table count for seat capacity estimation
      const tables = await Table.find({ restaurantId: restaurant._id, isActive: true });
      const totalSeats = tables.reduce((sum, table) => sum + (table.capacity || 0), 0);

      // Update restaurant
      restaurant.subscriptionPlan = 'legacy-free';
      restaurant.subscriptionStatus = 'active';
      restaurant.signupSource = 'super-admin';
      restaurant.seatCapacity = totalSeats || 50; // Default to 50 if no tables
      restaurant.country = null; // Super Admin should update
      restaurant.state = null;
      
      // Keep stripeCustomerId as null (no Stripe subscription)
      // isActive remains true

      await restaurant.save();
      migratedCount++;

      console.log(`  ✅ Migrated: ${restaurant.name}`);
      console.log(`     - Plan: legacy-free`);
      console.log(`     - Seat Capacity: ${restaurant.seatCapacity} (from ${tables.length} tables)`);
      console.log(`     - Status: active (no billing)`);
    }

    console.log(`\n\n✅ Migration Complete!`);
    console.log(`   Total migrated: ${migratedCount} restaurants`);
    console.log(`\n⚠️  NEXT STEPS:`);
    console.log(`   1. Review each restaurant in Super Admin panel`);
    console.log(`   2. Add country (US/CA) and state/province if needed`);
    console.log(`   3. Verify seat capacity is accurate`);
    console.log(`   4. These restaurants will remain FREE FOREVER\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateLegacyRestaurants();
