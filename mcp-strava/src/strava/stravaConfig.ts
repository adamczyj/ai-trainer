import { config } from '@src/utils/config';
import { getTokenStore } from '@src/utils/tokenStore/index';

/**
 * Strava API Configuration
 * Centralized configuration for Strava environment variables from .env.example
 */

export const StravaOpenApiUrl = "https://developers.strava.com/swagger/swagger.json";

export interface StravaConfig {
  // OAuth2 Credentials
  clientId: string;
  clientSecret: string;
  accessToken: Promise<string | null>;
  refreshToken: Promise<string | null>;
  
  // API Configuration
  baseUrl: string;
  
  // Methods
  hasValidTokens: () => Promise<boolean>;
  getAuthHeaders: () => Promise<Record<string, string>>;
}

/**
 * Strava configuration object with methods for accessing environment variables
 */
export const stravaConfig: StravaConfig = {
  // OAuth2 Credentials
  get clientId(): string {
    const value = config.get('STRAVA_CLIENT_ID', '');
    if (!value) {
      throw new Error('STRAVA_CLIENT_ID environment variable is required');
    }
    return value;
  },

  get clientSecret(): string {
    const value = config.get('STRAVA_CLIENT_SECRET', '');
    if (!value) {
      throw new Error('STRAVA_CLIENT_SECRET environment variable is required');
    }
    return value;
  },

  get accessToken(): Promise<string | null> {
    const store = getTokenStore();
    return store.getAccessToken();
  },

  get refreshToken(): Promise<string | null>  {
    const store = getTokenStore();
    return store.getRefreshToken();
  },

  // API Configuration
  get baseUrl(): string {
    return config.get('STRAVA_BASE_URL', 'https://www.strava.com/api/v3');
  },


  /**
   * Check if valid tokens are available
   * @returns Promise<boolean> true if both access and refresh tokens are present
   */
  async hasValidTokens(): Promise<boolean> {
    const accessToken = await this.accessToken;
    const refreshToken = await this.refreshToken;
    return !!(accessToken && refreshToken);
  },

  /**
   * Get authorization headers for API requests
   * @returns Promise<Object> with Authorization header
   * @throws Error if no access token is available
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const accessToken = await this.accessToken;
    if (!accessToken) {
      throw new Error('No access token available. Please authenticate first.');
    }
    
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  },
};

/**
 * Validate that all required Strava configuration is present
 * @throws Error if required configuration is missing
 */
export function validateStravaConfig(): void {
  // Check required OAuth2 credentials
  try {
    stravaConfig.clientId;
    stravaConfig.clientSecret;
  } catch (error) {
    throw new Error(`Strava configuration validation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get all available Strava environment variables (for debugging)
 * @returns Promise<Object> with all Strava config values
 */
export async function getAllStravaConfig(): Promise<Record<string, any>> {
  const accessToken = await stravaConfig.accessToken;
  const refreshToken = await stravaConfig.refreshToken;
  return {
    clientId: stravaConfig.clientId,
    clientSecret: stravaConfig.clientSecret ? '[REDACTED]' : null,
    accessToken: accessToken ? '[REDACTED]' : null,
    refreshToken: refreshToken ? '[REDACTED]' : null,
    baseUrl: stravaConfig.baseUrl,
    hasValidTokens: await stravaConfig.hasValidTokens(),
  };
} 