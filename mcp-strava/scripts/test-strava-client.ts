#!/usr/bin/env tsx

/**
 * Test script for the generated Strava API client
 * Run with: npm run test:strava-client
 */

import { stravaClient } from '@src/strava/stravaClient';

async function testStravaClient() {
  console.log('🧪 Testing Strava API Client...\n');

  try {
    // Test 1: Check authentication
    console.log('1️⃣ Checking authentication...');
    if (!stravaClient.isAuthenticated()) {
      console.log('❌ Not authenticated. Please set up your Strava tokens.');
      console.log('Required environment variables:');
      console.log('- STRAVA_CLIENT_ID');
      console.log('- STRAVA_CLIENT_SECRET');
      console.log('- STRAVA_ACCESS_TOKEN');
      console.log('- STRAVA_REFRESH_TOKEN');
      return;
    }
    console.log('✅ Authentication check passed');

    // Test 2: Get athlete profile
    console.log('\n2️⃣ Testing athlete profile API...');
    const athlete = await stravaClient.athletes.getLoggedInAthlete();
    console.log(`✅ Got athlete profile: ${athlete.data.firstname} ${athlete.data.lastname}`);

    // Test 3: Get recent activities
    console.log('\n3️⃣ Testing activities API...');
    const activities = await stravaClient.activities.getLoggedInAthleteActivities(1, 3);
    console.log(`✅ Got ${activities.data.length} recent activities`);

    // Test 4: Get clubs
    console.log('\n4️⃣ Testing clubs API...');
    const clubs = await stravaClient.clubs.getLoggedInAthleteClubs();
    console.log(`✅ Got ${clubs.data.length} clubs`);

    console.log('\n🎉 All tests passed! The Strava API client is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    process.exit(1);
  }
}

// Run the test
testStravaClient(); 