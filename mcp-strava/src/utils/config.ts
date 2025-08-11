import dotenv from 'dotenv';

export interface Config {
  get: <T = string>(key: string, defaultValue: T) => T;
}

const loadEnvironmentVariables = () => {
  const originalStdout = process.stdout.write;
  process.stdout.write = () => true; // Suppress stdout during dotenv load
  dotenv.config({ debug: false });
  process.stdout.write = originalStdout; // Restore stdout
};

// Load environment variables immediately when module is imported
loadEnvironmentVariables();

export const config: Config = {
  get: <T = string>(key: string, defaultValue: T): T => {
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue;
    }
    
    // Try to parse as the expected type
    if (typeof defaultValue === 'number') {
      const parsed = Number(value);
      return isNaN(parsed) ? defaultValue : parsed as T;
    }
    
    if (typeof defaultValue === 'boolean') {
      return (value.toLowerCase() === 'true') as T;
    }
    
    return value as T;
  },
}; 