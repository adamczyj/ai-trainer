import fs from 'fs/promises';
import path from 'path';
import { config } from '@src/utils/config';
import { logger } from '@src/utils/logger';
import type { TokenInfo } from '@src/types/auth';
import type { TokenStore } from './TokenStore.js';

function getDefaultTokensPath(): string {
  const configured = config.get<string>('TOKENS_FILE_PATH', '');
  if (configured && configured.trim().length > 0) {
    return path.isAbsolute(configured)
      ? configured
      : path.resolve(process.cwd(), configured);
  }
  return path.join(process.cwd(), 'tokens', 'strava-tokens.json');
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

async function ensureDirExists(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

export class FileTokenStore implements TokenStore {
  private readonly tokensFilePath: string;
  private cachedTokens: TokenInfo | null = null;
  private lastLoadedMs: number = 0;
  private readonly cacheTtlMs: number = 5_000; // small cache to reduce I/O

  constructor(tokensFilePath?: string) {
    this.tokensFilePath = tokensFilePath ?? getDefaultTokensPath();
  }

  private async loadFromDiskWithCache(): Promise<TokenInfo | null> {
    const now = Date.now();
    if (this.cachedTokens && now - this.lastLoadedMs < this.cacheTtlMs) {
      return this.cachedTokens;
    }
    const tokens = await readJsonFile<TokenInfo>(this.tokensFilePath);
    this.cachedTokens = tokens;
    this.lastLoadedMs = now;
    if (tokens) {
      logger.info('✅ Tokens loaded from file');
      if (tokens.timestamp) logger.info(`📅 Tokens were saved: ${tokens.timestamp}`);
      if (tokens.expires_at) logger.info(`⏰ Tokens expire: ${new Date(tokens.expires_at * 1000).toLocaleString()}`);
    } else {
      logger.info('❌ No saved tokens found or error loading tokens');
    }
    return tokens;
  }

  async getTokens(): Promise<TokenInfo | null> {
    return this.loadFromDiskWithCache();
  }

  async setTokens(tokens: TokenInfo): Promise<void> {
    const payload: TokenInfo = {
      ...tokens,
      timestamp: new Date().toISOString(),
    };
    await ensureDirExists(this.tokensFilePath);
    const serialized = JSON.stringify(payload, null, 2);
    await fs.writeFile(this.tokensFilePath, serialized, 'utf-8');
    this.cachedTokens = payload;
    this.lastLoadedMs = Date.now();
    logger.info('💾 Tokens saved to file');
  }

  async getAccessToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens?.access_token ?? null;
  }

  async getRefreshToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens?.refresh_token ?? null;
  }

  async isAccessTokenExpired(bufferMinutes: number = 5): Promise<boolean> {
    const tokens = await this.getTokens();
    if (!tokens?.expires_at) return true;
    const now = Math.floor(Date.now() / 1000);
    const bufferSeconds = bufferMinutes * 60;
    return now >= (tokens.expires_at - bufferSeconds);
  }
}


