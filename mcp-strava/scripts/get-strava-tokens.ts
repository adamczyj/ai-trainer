#!/usr/bin/env tsx

/**
 * Helper script to get new Strava tokens with proper scopes
 * Run with: npm run get:tokens
 */

import { stravaConfig } from '@src/strava/stravaConfig';
import { getAuthorizationUrl, exchangeCodeForTokens } from '@src/utils/tokenUtils';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getStravaTokens() {
  console.log('🔐 Strava OAuth Token Helper\n');

  try {
    // Check if we have client credentials
    console.log('1️⃣ Checking client credentials...');
    try {
      const clientId = stravaConfig.clientId;
      const clientSecret = stravaConfig.clientSecret;
      console.log('✅ Client credentials found');
      console.log(`Client ID: ${clientId}`);
      console.log(`Client Secret: ${clientSecret.substring(0, 8)}...`);
    } catch (error) {
      console.log('❌ Missing client credentials');
      console.log('\n📋 Please set these environment variables:');
      console.log('- STRAVA_CLIENT_ID');
      console.log('- STRAVA_CLIENT_SECRET');
      console.log('\nYou can get these from: https://www.strava.com/settings/api');
      return;
    }

    // Generate authorization URL
    console.log('\n2️⃣ Generating authorization URL...');
    const scopes = [
      'activity:read_all',    // Read all activities (including private ones)
      'activity:write',       // Create and edit activities
      'profile:read_all',     // Read all profile information
      'read',                 // Read public data
      'read_all'              // Read private data
    ];

    const redirectUri = 'http://localhost:3000/callback';
    const authUrl = getAuthorizationUrl(scopes, redirectUri, 'token-helper');

    console.log('✅ Authorization URL generated');
    console.log('\n📋 Next steps:');
    console.log('1. Open this URL in your browser:');
    console.log(`   ${authUrl}`);
    console.log('\n2. Authorize the application with the requested scopes');
    console.log('\n3. You will be redirected to a URL like:');
    console.log('   http://localhost:3000/callback?state=token-helper&scope=activity:read_all,activity:write,profile:read_all&code=YOUR_AUTH_CODE');
    console.log('\n4. Copy the "code" parameter from the URL');

    // Get authorization code from user
    console.log('\n3️⃣ Enter the authorization code:');
    const authCode = await question('Authorization code: ');

    if (!authCode || authCode.trim() === '') {
      console.log('❌ No authorization code provided');
      return;
    }

    // Exchange code for tokens
    console.log('\n4️⃣ Exchanging code for tokens...');
    try {
      const tokenData = await exchangeCodeForTokens(authCode.trim());
      
      console.log('✅ Tokens obtained successfully!');
      console.log('\n📋 Token Information:');
      console.log(`Access Token: ${tokenData.access_token.substring(0, 20)}...`);
      console.log(`Refresh Token: ${tokenData.refresh_token.substring(0, 20)}...`);
      console.log(`Expires In: ${tokenData.expires_in} seconds`);
      console.log(`Expires At: ${new Date(tokenData.expires_at * 1000).toISOString()}`);
      
      if (tokenData.athlete) {
        console.log(`Athlete: ${tokenData.athlete.firstname} ${tokenData.athlete.lastname}`);
      }

      console.log('\n💾 Environment Variables:');
      console.log('Set these in your .env file or environment:');
      console.log(`STRAVA_ACCESS_TOKEN=${tokenData.access_token}`);
      console.log(`STRAVA_REFRESH_TOKEN=${tokenData.refresh_token}`);

      console.log('\n✅ You can now use the Strava API!');
      console.log('Run "npm run test:strava-client" to test the connection.');

    } catch (exchangeError) {
      console.log('❌ Failed to exchange code for tokens:', exchangeError.message);
      console.log('\n🔧 Common issues:');
      console.log('- Authorization code may have expired (they expire quickly)');
      console.log('- Authorization code may have been used already');
      console.log('- Client credentials may be incorrect');
      console.log('- Redirect URI may not match what was used in authorization');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the helper
getStravaTokens(); 