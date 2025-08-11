import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';

/**
 * MCP Tools for Strava Clubs Read Operations
 */

export interface ClubTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

export const clubsTools: ClubTool[] = [
  {
    name: 'get_logged_in_athlete_clubs',
    description: 'Get a list of clubs whose membership includes the authenticated athlete',
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
        logger.info('Fetching logged in athlete clubs', { args });
        
        const { page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.clubs.getLoggedInAthleteClubs(page, perPage);
        
        logger.info(`Retrieved ${response.data.length} clubs for athlete`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                clubs: response.data,
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
        logger.error('Error fetching athlete clubs:', error);
        throw new Error(`Failed to fetch athlete clubs: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_club_by_id',
    description: 'Get detailed information about a specific club by its ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the club'
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching club by ID', { args });
        
        const { id } = args;
        
        const response = await stravaClient.clubs.getClubById(id);
        
        logger.info(`Retrieved club ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching club by ID:', error);
        throw new Error(`Failed to fetch club: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_club_activities',
    description: 'Get recent activities from members of a specific club (authenticated athlete must belong to the club)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the club'
        },
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
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching club activities', { args });
        
        const { id, page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.clubs.getClubActivitiesById(id, page, perPage);
        
        logger.info(`Retrieved ${response.data.length} activities for club ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                activities: response.data,
                clubId: id,
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
        logger.error('Error fetching club activities:', error);
        throw new Error(`Failed to fetch club activities: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_club_members',
    description: 'Get a list of athletes who are members of a specific club',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the club'
        },
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
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching club members', { args });
        
        const { id, page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.clubs.getClubMembersById(id, page, perPage);
        
        logger.info(`Retrieved ${response.data.length} members for club ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                members: response.data,
                clubId: id,
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
        logger.error('Error fetching club members:', error);
        throw new Error(`Failed to fetch club members: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_club_admins',
    description: 'Get a list of administrators of a specific club',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The identifier of the club'
        },
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
      required: ['id'],
      additionalProperties: false
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching club admins', { args });
        
        const { id, page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.clubs.getClubAdminsById(id, page, perPage);
        
        logger.info(`Retrieved ${response.data.length} admins for club ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                admins: response.data,
                clubId: id,
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
        logger.error('Error fetching club admins:', error);
        throw new Error(`Failed to fetch club admins: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 