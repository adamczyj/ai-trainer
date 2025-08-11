import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Streams Read Operations
 */

export interface StreamTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const streamsTools: StreamTool[] = [
  {
    name: 'get_activity_streams',
    description: 'Get streams for a specific activity (requires activity:read scope, activity:read_all for Only Me activities)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the activity'
        },
        keys: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['time', 'distance', 'latlng', 'altitude', 'velocity_smooth', 'heartrate', 'cadence', 'watts', 'temp', 'moving', 'grade_smooth']
          },
          description: 'Desired stream types to retrieve'
        },
        keyByType: {
          type: 'boolean',
          description: 'Must be true (defaults to true)',
          default: true
        }
      },
      required: ['id', 'keys'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity streams', { args });
        
        const { id, keys, keyByType = true } = args;
        
        const response = await stravaClient.streams.getActivityStreams(id, keys, keyByType);
        
        logger.info(`Retrieved streams for activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                activityId: id,
                streams: response.data,
                requestedKeys: keys
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching activity streams:', error);
        throw new Error(`Failed to fetch activity streams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_route_streams',
    description: 'Get streams for a specific route (requires read_all scope for private routes)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the route'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching route streams', { args });
        
        const { id } = args;
        
        const response = await stravaClient.streams.getRouteStreams(id);
        
        logger.info(`Retrieved streams for route ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                routeId: id,
                streams: response.data
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching route streams:', error);
        throw new Error(`Failed to fetch route streams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_segment_effort_streams',
    description: 'Get streams for a specific segment effort (requires read_all scope)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the segment effort'
        },
        keys: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['time', 'distance', 'latlng', 'altitude', 'velocity_smooth', 'heartrate', 'cadence', 'watts', 'temp', 'moving', 'grade_smooth']
          },
          description: 'The types of streams to return'
        },
        keyByType: {
          type: 'boolean',
          description: 'Must be true (defaults to true)',
          default: true
        }
      },
      required: ['id', 'keys'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching segment effort streams', { args });
        
        const { id, keys, keyByType = true } = args;
        
        const response = await stravaClient.streams.getSegmentEffortStreams(id, keys, keyByType);
        
        logger.info(`Retrieved streams for segment effort ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                segmentEffortId: id,
                streams: response.data,
                requestedKeys: keys
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching segment effort streams:', error);
        throw new Error(`Failed to fetch segment effort streams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_segment_streams',
    description: 'Get streams for a specific segment (requires read_all scope for private segments)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the segment'
        },
        keys: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['distance', 'latlng', 'altitude']
          },
          description: 'The types of streams to return'
        },
        keyByType: {
          type: 'boolean',
          description: 'Must be true (defaults to true)',
          default: true
        }
      },
      required: ['id', 'keys'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching segment streams', { args });
        
        const { id, keys, keyByType = true } = args;
        
        const response = await stravaClient.streams.getSegmentStreams(id, keys, keyByType);
        
        logger.info(`Retrieved streams for segment ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                segmentId: id,
                streams: response.data,
                requestedKeys: keys
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching segment streams:', error);
        throw new Error(`Failed to fetch segment streams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 