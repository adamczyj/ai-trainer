import { z } from 'zod';

/**
 * MCP Tools for Strava Activities Read Operations
 */

export interface Tool {
  name: string;
  title: string;
  description: string;
  inputSchema: z.ZodRawShape;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string; }>; }>;
}
