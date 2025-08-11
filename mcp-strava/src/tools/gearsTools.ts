import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Gears Read Operations
 */

export interface GearTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const gearsTools: GearTool[] = [
  {
    name: 'get_gear_by_id',
    description: 'Get detailed information about a specific piece of equipment (gear) by its ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The identifier of the gear'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching gear by ID', { args });
        
        const { id } = args;
        
        const response = await stravaClient.gears.getGearById(id);
        
        logger.info(`Retrieved gear ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching gear by ID:', error);
        throw new Error(`Failed to fetch gear: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 