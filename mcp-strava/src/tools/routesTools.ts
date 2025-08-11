import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Routes Read Operations
 */

export interface RouteTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const routesTools: RouteTool[] = [
  {
    name: 'get_routes_by_athlete_id',
    description: 'Get a list of routes created by the authenticated athlete (private routes filtered unless read_all scope)',
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
        logger.info('Fetching routes by athlete ID', { args });
        
        const { page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.routes.getRoutesByAthleteId(page, perPage);
        
        logger.info(`Retrieved ${response.data.length} routes for athlete`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                routes: response.data,
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
        logger.error('Error fetching routes by athlete ID:', error);
        throw new Error(`Failed to fetch routes: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_route_by_id',
    description: 'Get detailed information about a specific route by its ID (requires read_all scope for private routes)',
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
        logger.info('Fetching route by ID', { args });
        
        const { id } = args;
        
        const response = await stravaClient.routes.getRouteById(id);
        
        logger.info(`Retrieved route ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching route by ID:', error);
        throw new Error(`Failed to fetch route: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_route_as_gpx',
    description: 'Export a route as GPX file (requires read_all scope for private routes)',
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
        logger.info('Fetching route as GPX', { args });
        
        const { id } = args;
        
        const response = await stravaClient.routes.getRouteAsGPX(id);
        
        logger.info(`Retrieved GPX for route ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                routeId: id,
                gpxData: response.data,
                format: 'gpx'
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching route as GPX:', error);
        throw new Error(`Failed to fetch route GPX: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_route_as_tcx',
    description: 'Export a route as TCX file (requires read_all scope for private routes)',
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
        logger.info('Fetching route as TCX', { args });
        
        const { id } = args;
        
        const response = await stravaClient.routes.getRouteAsTCX(id);
        
        logger.info(`Retrieved TCX for route ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                routeId: id,
                tcxData: response.data,
                format: 'tcx'
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching route as TCX:', error);
        throw new Error(`Failed to fetch route TCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 