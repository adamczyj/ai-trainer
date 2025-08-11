#!/usr/bin/env tsx

/**
 * Simple OAuth callback server for Strava
 * Handles the redirect and exchanges authorization code for tokens
 */

import express from "express";
import { stravaConfig } from "../src/strava/stravaConfig.js";
import { exchangeCodeForTokens } from "../src/utils/tokenUtils.js";
import { logger } from "../src/utils/logger.js";
import fs from "fs/promises";
import path from "path";
import { TokenInfo } from "../src/types/auth.js";
import open from "open";

const app = express();
const PORT = 3000;

/**
 * Save tokens to a JSON file
 */
async function saveTokens(tokenData: TokenInfo): Promise<void> {
  const tokensDir = path.join(process.cwd(), "tokens");
  const tokensFile = path.join(tokensDir, "strava-tokens.json");

  // Create tokens directory if it doesn't exist
  try {
    await fs.mkdir(tokensDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Add timestamp if not present
  const dataToSave = {
    ...tokenData,
    timestamp: tokenData.timestamp || new Date().toISOString(),
  };

  // Save to file
  await fs.writeFile(tokensFile, JSON.stringify(dataToSave, null, 2));
  logger.info(`✅ Tokens saved to: ${tokensFile}`);
}

/**
 * Load tokens from file
 */
async function loadTokens(): Promise<TokenInfo | null> {
  const tokensFile = path.join(process.cwd(), "tokens", "strava-tokens.json");

  try {
    const data = await fs.readFile(tokensFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

// Handle OAuth callback
app.get("/callback", async (req, res) => {
  const { code, state, scope } = req.query;

  // Debug: Log all query parameters
  logger.debug("🔍 Debug: All query parameters:", req.query);

  logger.info("🔄 OAuth callback received:");
  logger.info(`State: ${state}`);
  logger.info(`Scope: ${scope}`);
  logger.info(
    `Code: ${code ? code.toString().substring(0, 20) + "..." : "none"}`
  );

  if (!code) {
    const error = req.query.error;
    logger.error("❌ OAuth error:", error);
    res.status(400).send(`
      <html>
        <body>
          <h1>OAuth Error</h1>
          <p>Error: ${error}</p>
          <p><a href="/">Try again</a></p>
        </body>
      </html>
    `);
    return;
  }

  try {
    logger.info("🔄 Exchanging authorization code for tokens...");
    logger.debug(
      "🔍 Debug: About to call exchangeCodeForTokens with code:",
      code.toString().substring(0, 20) + "..."
    );

    // Debug: Log the full code for manual testing
    logger.debug("🔍 Debug: Full authorization code:", code.toString());

    // Exchange code for tokens
    logger.debug("🔍 Debug: Calling exchangeCodeForTokens...");
    const tokenData = await exchangeCodeForTokens(code.toString());
    logger.debug("🔍 Debug: exchangeCodeForTokens completed, tokenData:", {
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
      accessTokenLength: tokenData.access_token?.length || 0,
      refreshTokenLength: tokenData.refresh_token?.length || 0,
      expiresIn: tokenData.expires_in,
      expiresAt: tokenData.expires_at,
    });

    logger.info("✅ Tokens obtained successfully!");
    logger.debug("Token data:", tokenData);

    if (tokenData.athlete) {
      logger.info(
        `Athlete: ${tokenData.athlete.firstname} ${tokenData.athlete.lastname}`
      );
    }

    // Save tokens to file
    logger.info("✅ Saving tokens to file");
    await saveTokens({
      ...tokenData,
      timestamp: new Date().toISOString(),
    });
    logger.info("✅ Tokens saved to file");

    // Send success response
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #fc4c02;">✅ Strava OAuth Successful!</h1>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Token Information:</h3>
            <p><strong>Access Token:</strong> ${tokenData.access_token}...</p>
            <p><strong>Refresh Token:</strong> ${tokenData.refresh_token}...</p>
            <p><strong>Expires In:</strong> ${tokenData.expires_in} seconds</p>
            <p><strong>Expires At:</strong> ${new Date(
              tokenData.expires_at * 1000
            ).toLocaleString()}</p>
            ${
              tokenData.athlete
                ? `<p><strong>Athlete:</strong> ${tokenData.athlete.firstname} ${tokenData.athlete.lastname}</p>`
                : ""
            }
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>✅ What happened:</h3>
            <ul>
              <li>Tokens have been saved to <code>tokens/strava-tokens.json</code></li>
              <li>Environment variables have been updated for this session</li>
              <li>You can now use the Strava API!</li>
            </ul>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>📋 Next Steps:</h3>
            <p>Run these commands to test your setup:</p>
            <ul>
              <li><code>npm run test:strava-client</code> - Test the API connection</li>
              <li><code>npm run debug:tokens</code> - Debug token status</li>
            </ul>
          </div>

          <p style="text-align: center; margin-top: 30px;">
            <a href="/" style="background: #fc4c02; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Get New Tokens
            </a>
          </p>
        </body>
      </html>
    `);
  } catch (error) {
    logger.error("❌ Failed to exchange code for tokens:", error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #dc3545;">❌ OAuth Error</h1>
          <div style="background: #f8d7da; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Error Details:</h3>
            <p>${error instanceof Error ? error.message : String(error)}</p>
          </div>
          <p><a href="/">Try again</a></p>
        </body>
      </html>
    `);
  }
});

// Home page with authorization URL
app.get("/", async (req, res) => {
  try {
    // Check if we have existing tokens
    const existingTokens = await loadTokens();

    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #fc4c02;">Strava OAuth Server</h1>
          
          ${
            existingTokens
              ? `
            <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3>✅ Existing Tokens Found</h3>
              <p>Expires at: ${new Date(
                existingTokens.expires_at * 1000
              ).toLocaleString()}</p>
            </div>
          `
              : ""
          }
          
          <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>🔐 Get Strava Access Tokens</h3>
            <p>Click the button below to authorize this application with Strava:</p>
            <a href="https://www.strava.com/oauth/authorize?client_id=${
              stravaConfig.clientId
            }&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=activity%3Aread_all%2Cactivity%3Awrite%2Cprofile%3Aread_all%2Cread%2Cread_all&approval_prompt=force&state=oauth-server" 
               style="background: #fc4c02; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
              🔐 Authorize with Strava
            </a>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>📋 What this will do:</h3>
            <ul>
              <li>Redirect you to Strava's authorization page</li>
              <li>Request permissions for reading/writing activities</li>
              <li>Handle the callback and exchange code for tokens</li>
              <li>Save tokens to <code>tokens/strava-tokens.json</code></li>
              <li>Update environment variables</li>
            </ul>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <html>
        <body>
          <h1>Error</h1>
          <p>${error instanceof Error ? error.message : String(error)}</p>
        </body>
      </html>
    `);
  }
});

// Start the server
app.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  
  logger.info(`🚀 OAuth server running at ${serverUrl}`);
  logger.info(`📋 Opening browser automatically...`);
  
  // Automatically open the browser using the 'open' package
  setTimeout(async () => {
    try {
      await open(serverUrl);
      logger.info(`🌐 Opened browser to ${serverUrl}`);
    } catch (error) {
      logger.warn(`Failed to open browser: ${error instanceof Error ? error.message : String(error)}`);
      logger.info(`📋 Please open your browser manually and visit: ${serverUrl}`);
    }
  }, 1000); // Small delay to ensure server is fully ready
  
  logger.info(`📋 If browser doesn't open, visit: ${serverUrl}`);
  logger.info(`📋 Or use the authorization URL directly:`);
  logger.info(
    `https://www.strava.com/oauth/authorize?client_id=${stravaConfig.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=activity%3Aread_all%2Cactivity%3Awrite%2Cprofile%3Aread_all%2Cread%2Cread_all&approval_prompt=force&state=oauth-server`
  );
});
