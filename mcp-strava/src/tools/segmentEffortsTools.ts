import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Segment Efforts Read Operations
 */

export interface SegmentEffortTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const segmentEffortsTools: SegmentEffortTool[] = [
  {
    name: 'get_segment_effort_by_id',
    description: 'Get detailed information about a specific segment effort by its ID (requires subscription)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the segment effort'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching segment effort by ID', { args });
        
        const { id } = args;
        
        const response = await stravaClient.segmentEfforts.getSegmentEffortById(id);
        
        logger.info(`Retrieved segment effort ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching segment effort by ID:', error);
        throw new Error(`Failed to fetch segment effort: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_efforts_by_segment_id',
    description: 'Get a set of the authenticated athlete\'s segment efforts for a given segment (requires subscription)',
    inputSchema: {
      type: 'object',
      properties: {
        segmentId: {
          type: 'number',
          description: 'The identifier of the segment'
        },
        startDateLocal: {
          type: 'string',
          description: 'ISO 8601 formatted date time for start date (optional)'
        },
        endDateLocal: {
          type: 'string',
          description: 'ISO 8601 formatted date time for end date (optional)'
        },
        perPage: {
          type: 'number',
          description: 'Number of items per page (defaults to 30)',
          default: 30
        }
      },
      required: ['segmentId'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching efforts by segment ID', { args });
        
        const { segmentId, startDateLocal, endDateLocal, perPage = 30 } = args;
        
        const response = await stravaClient.segmentEfforts.getEffortsBySegmentId(
          segmentId,
          startDateLocal,
          endDateLocal,
          perPage
        );
        
        logger.info(`Retrieved ${response.data.length} efforts for segment ${segmentId}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                efforts: response.data,
                segmentId,
                filters: {
                  startDateLocal,
                  endDateLocal,
                  perPage
                },
                total: response.data.length
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching efforts by segment ID:', error);
        throw new Error(`Failed to fetch segment efforts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 