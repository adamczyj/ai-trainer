import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Athletes Read Operations
 */

export interface AthleteTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const athletesTools: AthleteTool[] = [
  {
    name: 'get_logged_in_athlete',
    description: 'Get the currently authenticated athlete profile information',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching logged in athlete', { args });
        
        const response = await stravaClient.athletes.getLoggedInAthlete();
        
        logger.info('Retrieved logged in athlete profile');
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching logged in athlete:', error);
        throw new Error(`Failed to fetch athlete profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_logged_in_athlete_zones',
    description: 'Get the authenticated athlete\'s heart rate and power zones (requires profile:read_all)',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching logged in athlete zones', { args });
        
        const response = await stravaClient.athletes.getLoggedInAthleteZones();
        
        logger.info('Retrieved athlete zones');
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching athlete zones:', error);
        throw new Error(`Failed to fetch athlete zones: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_athlete_stats',
    description: 'Get activity stats of an athlete (only includes data from activities set to Everyone visibility)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the athlete (must match the authenticated athlete)'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching athlete stats', { args });
        
        const { id } = args;
        
        const response = await stravaClient.athletes.getStats(id);
        
        logger.info(`Retrieved stats for athlete ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching athlete stats:', error);
        throw new Error(`Failed to fetch athlete stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 