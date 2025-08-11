import { stravaClient } from '@src/strava/stravaClient';

/**
 * Example usage of the generated Strava API client
 */
async function stravaClientExample() {
  try {
    // Check if we have valid tokens
    if (!stravaClient.isAuthenticated()) {
      console.log('❌ Not authenticated. Please set up your Strava tokens first.');
      console.log('Set these environment variables:');
      console.log('- STRAVA_CLIENT_ID');
      console.log('- STRAVA_CLIENT_SECRET');
      console.log('- STRAVA_ACCESS_TOKEN');
      console.log('- STRAVA_REFRESH_TOKEN');
      return;
    }

    console.log('✅ Authenticated with Strava API');

    // Example 1: Get the authenticated athlete's profile
    console.log('\n📊 Getting athlete profile...');
    const athlete = await stravaClient.athletes.getLoggedInAthlete();
    console.log(`👤 Athlete: ${athlete.data.firstname} ${athlete.data.lastname}`);
    console.log(`🏠 Location: ${athlete.data.city}, ${athlete.data.state}, ${athlete.data.country}`);
    console.log(`👥 Followers: ${athlete.data.follower_count}, Friends: ${athlete.data.friend_count}`);

    // Example 2: Get recent activities
    console.log('\n🏃 Getting recent activities...');
    const activities = await stravaClient.activities.getLoggedInAthleteActivities(1, 5);
    console.log(`📈 Found ${activities.data.length} recent activities:`);
    
    activities.data.forEach((activity, index) => {
      console.log(`  ${index + 1}. ${activity.name || 'Unnamed Activity'} (${activity.type || 'Unknown'})`);
      console.log(`     Distance: ${activity.distance ? (activity.distance / 1000).toFixed(2) : 'Unknown'}km`);
      console.log(`     Duration: ${activity.moving_time ? Math.round(activity.moving_time / 60) : 'Unknown'} minutes`);
      console.log(`     Date: ${activity.start_date ? new Date(activity.start_date).toLocaleDateString() : 'Unknown'}`);
    });

    // Example 3: Get athlete's clubs
    console.log('\n🏢 Getting athlete clubs...');
    const clubs = await stravaClient.clubs.getLoggedInAthleteClubs();
    console.log(`🏢 Found ${clubs.data.length} clubs:`);
    
    clubs.data.forEach((club, index) => {
      console.log(`  ${index + 1}. ${club.name} (${club.member_count} members)`);
    });

    // Example 4: Get athlete's gear (bikes and shoes)
    console.log('\n🚴 Getting athlete gear...');
    const athleteDetail = await stravaClient.athletes.getLoggedInAthlete();
    
    if (athleteDetail.data.bikes && athleteDetail.data.bikes.length > 0) {
      console.log('🚴 Bikes:');
      athleteDetail.data.bikes.forEach((bike, index) => {
        console.log(`  ${index + 1}. ${bike.name} (${bike.distance ? (bike.distance / 1000) : 0}km)`);
      });
    }

    if (athleteDetail.data.shoes && athleteDetail.data.shoes.length > 0) {
      console.log('👟 Shoes:');
      athleteDetail.data.shoes.forEach((shoe, index) => {
        console.log(`  ${index + 1}. ${shoe.name} (${shoe.distance ? (shoe.distance / 1000) : 0}km)`);
      });
    }

    console.log('\n✅ Strava API client example completed successfully!');

  } catch (error: unknown) {
    console.error('❌ Error using Strava API client:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      console.error('Response status:', axiosError.response?.status);
      console.error('Response data:', axiosError.response?.data);
    }
  }
}

// Export the example function
export { stravaClientExample };

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  stravaClientExample();
} 