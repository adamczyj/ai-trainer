import { stravaConfig } from '@src/strava/stravaConfig';
import { logger } from '@src/utils/logger';
import type { TokenInfo } from '@src/types/auth';
import { getTokenStore } from '@src/utils/tokenStore/index';

/**
 * Utility functions for managing Strava tokens and authentication
 */

// TokenInfo moved to src/types/auth.ts

/**
 * Check if the current access token has the required scope
 * @param requiredScope - The scope to check for (e.g., 'activity:read')
 * @returns true if the token has the required scope
 */
export async function checkTokenScope(_requiredScope: string): Promise<boolean> {
  try {
    const accessToken = await stravaConfig.accessToken;
    if (!accessToken) {
      logger.error('No access token available for scope check');
      return false;
    }

    const response = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      const errorData = await response.json();
      logger.error('Token scope check failed:', errorData);
      return false;
    }

    return response.ok;
  } catch (error) {
    logger.error('Error checking token scope:', error);
    return false;
  }
}

/**
 * Refresh the access token using the refresh token
 * @returns Promise with new token information
 */
export async function refreshAccessToken(): Promise<TokenInfo> {
  const tokenStore = getTokenStore();
  const refreshToken = await tokenStore.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: stravaConfig.clientId,
      client_secret: stravaConfig.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Token refresh failed: ${JSON.stringify(errorData)}`);
  }

  const tokenData = await response.json() as TokenInfo;
  // Persist tokens via the tokenStore abstraction
  await tokenStore.setTokens(tokenData);
  // Update environment variables for current process (for backward compatibility)
  process.env['STRAVA_ACCESS_TOKEN'] = tokenData.access_token;
  process.env['STRAVA_REFRESH_TOKEN'] = tokenData.refresh_token;
  return tokenData;
}

/**
 * Get the OAuth authorization URL for requesting specific scopes
 * @param scopes - Array of scopes to request
 * @param redirectUri - The redirect URI for your application
 * @param state - Optional state parameter for security
 * @returns The authorization URL
 */
export function getAuthorizationUrl(
  scopes: string[],
  redirectUri: string,
  state?: string
): string {
  const params = new URLSearchParams({
    client_id: stravaConfig.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes.join(','),
    approval_prompt: 'force', // Force re-authorization to ensure proper scopes
  });

  if (state) {
    params.append('state', state);
  }

  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 * @param code - The authorization code from the OAuth redirect
 * @returns Promise with token information
 */
export async function exchangeCodeForTokens(code: string): Promise<TokenInfo> {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: stravaConfig.clientId,
      client_secret: stravaConfig.clientSecret,
      code: code,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Token exchange failed: ${JSON.stringify(errorData)}`);
  }

  const tokenData = await response.json() as TokenInfo;
  
  return tokenData;
}

/**
 * Check if a token is expired or will expire soon
 * @param expiresAt - Token expiration timestamp
 * @param bufferMinutes - Buffer time in minutes (default: 5)
 * @returns true if token is expired or will expire soon
 */
export function isTokenExpired(expiresAt: number, bufferMinutes: number = 5): boolean {
  const now = Math.floor(Date.now() / 1000);
  const bufferSeconds = bufferMinutes * 60;
  return now >= (expiresAt - bufferSeconds);
}

/**
 * Get token information for debugging
 * @returns Promise<Object> with token status information
 */
export async function getTokenInfo(): Promise<{
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  accessTokenLength: number;
  refreshTokenLength: number;
}> {
  const tokenStore = getTokenStore();
  const accessToken = await tokenStore.getAccessToken();
  const refreshToken = await tokenStore.getRefreshToken();
  return {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    accessTokenLength: accessToken?.length || 0,
    refreshTokenLength: refreshToken?.length || 0,
  };
} 