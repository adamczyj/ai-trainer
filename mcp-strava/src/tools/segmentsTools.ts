import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Segments Read Operations
 */

export interface SegmentTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const segmentsTools: SegmentTool[] = [
  {
    name: 'get_segment_by_id',
    description: 'Get detailed information about a specific segment by its ID (read_all scope required for private segments)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the segment'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching segment by ID', { args });
        
        const { id } = args;
        
        const response = await stravaClient.segments.getSegmentById(id);
        
        logger.info(`Retrieved segment ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching segment by ID:', error);
        throw new Error(`Failed to fetch segment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_logged_in_athlete_starred_segments',
    description: 'Get a list of the authenticated athlete\'s starred segments (private segments filtered unless read_all scope)',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number (defaults to 1)',
          default: 1
        },
        perPage: {
          type: 'number',
          description: 'Number of items per page (defaults to 30)',
          default: 30
        }
      },
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching logged in athlete starred segments', { args });
        
        const { page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.segments.getLoggedInAthleteStarredSegments(page, perPage);
        
        logger.info(`Retrieved ${response.data.length} starred segments for athlete`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                segments: response.data,
                pagination: {
                  page,
                  perPage,
                  total: response.data.length
                }
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching starred segments:', error);
        throw new Error(`Failed to fetch starred segments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'explore_segments',
    description: 'Search for segments by geographic bounds and other criteria (returns top 10 matching segments)',
    inputSchema: {
      type: 'object',
      properties: {
        bounds: {
          type: 'array',
          items: {
            type: 'number'
          },
          description: 'Array of 4 numbers: [southwest_lat, southwest_lng, northeast_lat, northeast_lng]',
          minItems: 4,
          maxItems: 4
        },
        activityType: {
          type: 'string',
          enum: ['running', 'riding'],
          description: 'Desired activity type (optional)'
        },
        minCat: {
          type: 'number',
          description: 'Minimum climbing category (optional)'
        },
        maxCat: {
          type: 'number',
          description: 'Maximum climbing category (optional)'
        }
      },
      required: ['bounds'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Exploring segments', { args });
        
        const { bounds, activityType, minCat, maxCat } = args;
        
        const response = await stravaClient.segments.exploreSegments(bounds, activityType, minCat, maxCat);
        
        logger.info(`Found ${response.data.segments?.length || 0} segments in exploration`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error exploring segments:', error);
        throw new Error(`Failed to explore segments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 