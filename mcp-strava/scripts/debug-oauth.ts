#!/usr/bin/env tsx

/**
 * Debug script for OAuth token exchange
 * Run with: npm run debug:oauth
 */

import { stravaConfig } from '@src/strava/stravaConfig';
import { exchangeCodeForTokens, getAuthorizationUrl } from '@src/utils/tokenUtils';
import { logger } from '@src/utils/logger';
import fs from 'fs/promises';
import path from 'path';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
  athlete?: any;
  timestamp: string;
}

/**
 * Save tokens to a JSON file
 */
async function saveTokens(tokenData: { accessToken: string; refreshToken: string; expiresAt: number; expiresIn: number; athlete?: any }): Promise<void> {
  const tokensDir = path.join(process.cwd(), 'tokens');
  const tokensFile = path.join(tokensDir, 'strava-tokens.json');
  
  // Create tokens directory if it doesn't exist
  try {
    await fs.mkdir(tokensDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Add timestamp
  const dataToSave = {
    ...tokenData,
    timestamp: new Date().toISOString()
  };

  // Save to file
  await fs.writeFile(tokensFile, JSON.stringify(dataToSave, null, 2));
  logger.info(`✅ Tokens saved to: ${tokensFile}`);
}

async function debugOAuth() {
  logger.info('🔍 Debug OAuth Token Exchange');
  logger.info('==============================');
  
  try {
    // Check client credentials
    logger.info('\n1️⃣ Checking client credentials...');
    logger.info(`Client ID: ${stravaConfig.clientId}`);
    logger.info(`Client Secret: ${stravaConfig.clientSecret.substring(0, 8)}...`);
    logger.info('✅ Client credentials found');

    // Generate authorization URL
    logger.info('\n2️⃣ Generating authorization URL...');
    const scopes = ['activity:read_all', 'activity:write', 'profile:read_all', 'read', 'read_all'];
    const redirectUri = 'http://localhost:3000/callback';
    const authUrl = getAuthorizationUrl(scopes, redirectUri, 'debug');
    logger.info('✅ Authorization URL generated');
    logger.info(`URL: ${authUrl}`);

    // Simulate token exchange (you'll need to provide a real code)
    logger.info('\n3️⃣ Testing token exchange...');
    logger.info('📋 To test with a real authorization code:');
    logger.info('1. Visit the authorization URL above');
    logger.info('2. Complete the OAuth flow');
    logger.info('3. Copy the authorization code from the redirect URL');
    logger.info('4. Update this script with the code and run again');

    // Example of what the token exchange would look like
    logger.info('\n4️⃣ Example token exchange structure:');
    logger.info('const tokenData = await exchangeCodeForTokens("YOUR_AUTH_CODE");');
    logger.info('await saveTokens(tokenData);');
    logger.info('process.env["STRAVA_ACCESS_TOKEN"] = tokenData.accessToken;');
    logger.info('process.env["STRAVA_REFRESH_TOKEN"] = tokenData.refreshToken;');

    // Check if we have existing tokens
    logger.info('\n5️⃣ Checking for existing tokens...');
    const tokensFile = path.join(process.cwd(), 'tokens', 'strava-tokens.json');
    try {
      const data = await fs.readFile(tokensFile, 'utf-8');
      const existingTokens = JSON.parse(data) as TokenData;
      logger.info('✅ Existing tokens found:');
      logger.info(`- Saved: ${existingTokens.timestamp}`);
      logger.info(`- Expires: ${new Date(existingTokens.expiresAt * 1000).toLocaleString()}`);
      logger.info(`- Access Token: ${existingTokens.accessToken.substring(0, 20)}...`);
      logger.info(`- Refresh Token: ${existingTokens.refreshToken.substring(0, 20)}...`);
    } catch (error) {
      logger.info('❌ No existing tokens found');
    }

  } catch (error) {
    logger.error('❌ Debug failed:', error);
  }
}

// Run the debug function
debugOAuth(); 