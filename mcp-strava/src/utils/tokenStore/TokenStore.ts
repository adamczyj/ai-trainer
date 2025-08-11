import type { TokenInfo } from '@src/types/auth';

/**
 * Abstraction for managing OAuth tokens regardless of the persistence backend.
 */
export interface TokenStore {
  /**
   * Retrieve the full token payload, or null if not present.
   */
  getTokens(): Promise<TokenInfo | null>;

  /**
   * Persist the full token payload (including rotated refresh token, expiry, etc.).
   */
  setTokens(tokens: TokenInfo): Promise<void>;

  /**
   * Convenience: get only the access token, or null if unavailable.
   */
  getAccessToken(): Promise<string | null>;

  /**
   * Convenience: get only the refresh token, or null if unavailable.
   */
  getRefreshToken(): Promise<string | null>;

  /**
   * Returns true if the current access token is expired or will expire within the buffer.
   */
  isAccessTokenExpired(bufferMinutes?: number): Promise<boolean>;
}


