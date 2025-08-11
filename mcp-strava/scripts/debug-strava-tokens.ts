#!/usr/bin/env tsx

/**
 * Debug script for Strava token issues
 * Run with: npm run debug:tokens
 */

import { stravaConfig } from '@src/strava/stravaConfig';
import { 
  getTokenInfo, 
  checkTokenScope, 
  refreshAccessToken, 
  getAuthorizationUrl 
} from '@src/utils/tokenUtils';

async function debugStravaTokens() {
  console.log('🔍 Debugging Strava Token Issues...\n');

  try {
    // Check basic token availability
    console.log('1️⃣ Checking token availability...');
    const tokenInfo = await getTokenInfo();
    console.log('Token Status:', tokenInfo);

    if (!tokenInfo.hasAccessToken || !tokenInfo.hasRefreshToken) {
      console.log('❌ Missing tokens. You need to authenticate first.');
      console.log('\n📋 To get new tokens:');
      console.log('1. Go to https://www.strava.com/settings/api');
      console.log('2. Create a new application or use existing one');
      console.log('3. Set your redirect URI');
      console.log('4. Use the authorization URL below:');
      
      const authUrl = getAuthorizationUrl(
        ['activity:read_all', 'activity:write', 'profile:read_all'],
        'http://localhost:3000/callback',
        'debug'
      );
      console.log(`\n🔗 Authorization URL:\n${authUrl}\n`);
      return;
    }

    console.log('✅ Tokens are present');

    // Check if token has required scope
    console.log('\n2️⃣ Checking token scope...');
    const hasActivityReadScope = await checkTokenScope('activity:read');
    
    if (!hasActivityReadScope) {
      console.log('❌ Token does not have activity:read scope');
      console.log('\n🔧 Solutions:');
      console.log('1. Refresh your token (might help if scope was granted but token is old)');
      console.log('2. Re-authenticate with proper scopes');
      
      // Try refreshing the token
      console.log('\n🔄 Attempting token refresh...');
      try {
        const newTokens = await refreshAccessToken();
        console.log('✅ Token refreshed successfully');
        console.log(`New token expires in: ${newTokens.expires_in} seconds`);
        
        // Check scope again after refresh
        const hasScopeAfterRefresh = await checkTokenScope('activity:read');
        if (hasScopeAfterRefresh) {
          console.log('✅ Token now has required scope after refresh!');
        } else {
          console.log('❌ Token still missing required scope after refresh');
          console.log('\n🔄 You need to re-authenticate with proper scopes:');
          const authUrl = getAuthorizationUrl(
            ['activity:read_all', 'activity:write', 'profile:read_all'],
            'http://localhost:3000/callback',
            'debug'
          );
          console.log(`\n🔗 Re-authorization URL:\n${authUrl}\n`);
        }
      } catch (refreshError) {
        console.log('❌ Token refresh failed:', refreshError.message);
        console.log('\n🔄 You need to re-authenticate:');
        const authUrl = getAuthorizationUrl(
          ['activity:read_all', 'activity:write', 'profile:read_all'],
          'http://localhost:3000/callback',
          'debug'
        );
        console.log(`\n🔗 Re-authorization URL:\n${authUrl}\n`);
      }
    } else {
      console.log('✅ Token has required activity:read scope');
    }

    // Test API call
    console.log('\n3️⃣ Testing API call...');
    try {
      const accessToken = await stravaConfig.accessToken;
      if (!accessToken) {
        console.log('❌ No access token available for API test');
        return;
      }
      
      const response = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const athlete = await response.json();
        console.log('✅ API call successful');
        console.log(`👤 Athlete: ${athlete.firstname} ${athlete.lastname}`);
      } else {
        const errorData = await response.json();
        console.log('❌ API call failed:', errorData);
      }
    } catch (apiError) {
      console.log('❌ API call error:', apiError.message);
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

// Run the debug script
debugStravaTokens(); 