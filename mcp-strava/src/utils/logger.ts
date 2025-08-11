import fs from 'fs';
import path from 'path';
import { config as appConfig } from './config.js';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export enum LoggerType {
  FILE = 'file',
  STDIO = 'stdio'
}

const LogLevelValues: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3
};

export interface Logger {
  info: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

export interface LoggerConfig {
  logsPath: string;
  logLevel: LogLevel;
  loggerType: LoggerType;
}

const createLogger = (config: LoggerConfig): Logger => {
  const { logsPath, logLevel, loggerType } = config;

  // Initialize file logging directory if needed
  if (loggerType === LoggerType.FILE && !fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath, { recursive: true });
  }

  const shouldLog = (level: LogLevel): boolean => {
    return LogLevelValues[level] >= LogLevelValues[logLevel];
  };

  const formatLogMessage = (level: LogLevel, message: string, args: any[]): string => {
    const timestamp = new Date().toISOString();
    const levelName = level.toUpperCase();
    const argsString = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
    return `[${timestamp}] [${levelName}] ${message}${argsString}`;
  };

  const writeToLogFile = (level: LogLevel, message: string, args: any[]) => {
    if (!shouldLog(level)) {
      return;
    }

    const logEntry = formatLogMessage(level, message, args) + '\n';
    const logFile = path.join(logsPath, `${level}.log`);
    const combinedLogFile = path.join(logsPath, 'logs.log');
    
    try {
      fs.appendFileSync(logFile, logEntry);
      fs.appendFileSync(combinedLogFile, logEntry);
    } catch (error) {
      console.error(`Failed to write to log file:`, error);
    }
  };

  const writeToStdio = (level: LogLevel, message: string, args: any[]) => {
    if (!shouldLog(level)) {
      return;
    }

    const logEntry = formatLogMessage(level, message, args);
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(logEntry);
        break;
      case LogLevel.WARN:
        console.warn(logEntry);
        break;
      case LogLevel.DEBUG:
        console.debug(logEntry);
        break;
      case LogLevel.INFO:
      default:
        console.log(logEntry);
        break;
    }
  };

  const logFunction = loggerType === LoggerType.FILE ? writeToLogFile : writeToStdio;

  return {
    info: (message: string, ...args: any[]) => {
      logFunction(LogLevel.INFO, message, args);
    },
    error: (message: string, ...args: any[]) => {
      logFunction(LogLevel.ERROR, message, args);
    },
    warn: (message: string, ...args: any[]) => {
      logFunction(LogLevel.WARN, message, args);
    },
    debug: (message: string, ...args: any[]) => {
      logFunction(LogLevel.DEBUG, message, args);
    }
  };
};

export const logger = createLogger({
  logLevel: appConfig.get<LogLevel>('LOG_LEVEL', LogLevel.INFO),
  logsPath: appConfig.get('LOGS_PATH', ''),
  loggerType: appConfig.get<LoggerType>('LOGGER_TYPE', LoggerType.FILE),
});
