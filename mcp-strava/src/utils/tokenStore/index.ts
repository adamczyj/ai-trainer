import { FileTokenStore } from './fileTokenStore.js';
import type { TokenStore } from './TokenStore.js';
import { config } from '@src/utils/config';

let singletonStore: TokenStore | null = null;

export function getTokenStore(): TokenStore {
  if (singletonStore) return singletonStore;

  const backend = config.get<string>('TOKEN_STORE', 'file');
  switch (backend) {
    case 'file':
    default: {
      const tokensFilePath = config.get<string>('TOKENS_FILE_PATH', '');
      singletonStore = new FileTokenStore(tokensFilePath || undefined);
      return singletonStore;
    }
  }
}

export * from './TokenStore.js';
export * from './fileTokenStore.js';


