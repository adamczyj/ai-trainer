import { stravaClient } from '@src/strava/stravaClient';
import { logger } from '@src/utils/logger';
import { selectFieldsFromArray } from '@src/tools/utils/selectFields';
import { z } from 'zod';
import { Tool } from '../ActivityTool';

// Field presets for different levels of detail
const listView = ['id', 'name', 'type', 'start_date', 'distance', 'moving_time'] as const;
const summary = [...listView,
    'sport_type', 'elapsed_time', 'total_elevation_gain', 'average_speed',
    'kudos_count', 'comment_count', 'achievement_count'
] as const;
const fullDetails = [...summary,
    'external_id', 'upload_id', 'athlete', 'start_date_local', 'timezone',
    'elev_high', 'elev_low', 'max_speed', 'average_watts', 'max_watts', 'kilojoules',
    'athlete_count', 'trainer', 'commute', 'manual', 'workout_type', 'gear_id'
] as const;

const FIELD_PRESETS = {
  listView: listView,
  summary: summary,
  fullDetails: fullDetails
};

export const activitiesTools: Tool[] = [
  {
    name: 'get_athlete_activities',
    title: 'Get the authenticated athlete\'s activities with optional filtering by date range and pagination',
    description: 'Get the authenticated athlete\'s activities with optional filtering by date range and pagination',
    inputSchema: {
      before: z.number().optional().describe('Epoch timestamp to filter activities before this time'),
      after: z.number().optional().describe('Epoch timestamp to filter activities after this time'),
      page: z.number().default(1).describe('Page number (defaults to 1)'),
      perPage: z.number().min(1).max(200).default(30).describe('Number of items per page (defaults to 30, max 200)'),
      fields: z.array(z.enum(fullDetails)).optional().describe('Specific fields to include in response. If provided, overrides preset.'),
      preset: z.enum(['listView', 'summary', 'fullDetails']).default('listView').describe('Predefined field sets: listView (6 fields, ~70% token reduction - ideal for activity lists, dashboards, and overview pages), summary (13 fields, ~40% reduction - perfect for activity cards, performance summaries, and social sharing), fullDetails (most fields except location data - best for detailed analysis, training logs, and data export)')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching athlete activities', { args });
        
        const { before, after, page = 1, perPage = 30, fields, preset = 'listView' } = args;
        
        // Determine which fields to include
        const selectedFields = (fields && fields.length > 0) ? fields : FIELD_PRESETS[preset as keyof typeof FIELD_PRESETS];
        
        const response = await stravaClient.activities.getLoggedInAthleteActivities(
          before,
          after,
          page,
          perPage
        );
        
        // Filter activities to only include selected fields using our utility
        const filteredActivities = selectFieldsFromArray(response.data, selectedFields);
        
        logger.info(`Retrieved ${response.data.length} activities with ${selectedFields.length} fields each`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                activities: filteredActivities,
                pagination: {
                  page,
                  perPage,
                  total: response.data.length
                },
                fieldSelection: {
                  preset: (fields && fields.length > 0) ? 'custom' : preset,
                  fieldsIncluded: selectedFields,
                  totalFields: selectedFields.length
                }
              }) // Removed pretty printing to save tokens
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching athlete activities:', error);
        throw new Error(`Failed to fetch activities: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_activity_by_id',
    title: 'Get detailed information about a specific activity by its ID',
    description: 'Get detailed information about a specific activity by its ID',
    inputSchema: {
      id: z.number().describe('The identifier of the activity'),
      includeAllEfforts: z.boolean().default(false).describe('Include all segment efforts in the response (optional)')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity by ID', { args });
        
        const { id, includeAllEfforts = false } = args;
        
        const response = await stravaClient.activities.getActivityById(
          id,
          includeAllEfforts
        );
        
        logger.info(`Retrieved activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(response.data, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching activity by ID:', error);
        throw new Error(`Failed to fetch activity: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_activity_comments',  
    title: 'Get comments for a specific activity',
    description: 'Get comments for a specific activity',
    inputSchema: {
      id: z.number().describe('The identifier of the activity'),
      pageSize: z.number().default(30).describe('Number of items per page (defaults to 30)'),
      afterCursor: z.string().optional().describe('Cursor for pagination (optional)')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity comments', { args });
        
        const { id, pageSize = 30, afterCursor } = args;
        
        const response = await stravaClient.activities.getCommentsByActivityId(
          id,
          undefined, // page (deprecated)
          undefined, // perPage (deprecated)
          pageSize,
          afterCursor
        );
        
        logger.info(`Retrieved ${response.data.length} comments for activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                comments: response.data,
                activityId: id,
                pagination: {
                  pageSize,
                  total: response.data.length
                }
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching activity comments:', error);
        throw new Error(`Failed to fetch comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_activity_kudoers',
    title: 'Get athletes who kudoed a specific activity',
    description: 'Get athletes who kudoed a specific activity',
    inputSchema: {
      id: z.number().describe('The identifier of the activity'),
      page: z.number().default(1).describe('Page number (defaults to 1)'),
      perPage: z.number().default(30).describe('Number of items per page (defaults to 30)')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity kudoers', { args });
        
        const { id, page = 1, perPage = 30 } = args;
        
        const response = await stravaClient.activities.getKudoersByActivityId(
          id,
          page,
          perPage
        );
        
        logger.info(`Retrieved ${response.data.length} kudoers for activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                kudoers: response.data,
                activityId: id,
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
        logger.error('Error fetching activity kudoers:', error);
        throw new Error(`Failed to fetch kudoers: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_activity_laps',
    title: 'Get laps for a specific activity',
    description: 'Get laps for a specific activity',
    inputSchema: {
      id: z.number().describe('The identifier of the activity')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity laps', { args });
        
        const { id } = args;
        
        const response = await stravaClient.activities.getLapsByActivityId(id);
        
        logger.info(`Retrieved ${response.data.length} laps for activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                laps: response.data,
                activityId: id,
                total: response.data.length
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching activity laps:', error);
        throw new Error(`Failed to fetch laps: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  },
  
  {
    name: 'get_activity_zones', 
    title: 'Get heart rate and power zones for a specific activity (Summit feature)',
    description: 'Get heart rate and power zones for a specific activity (Summit feature)',
    inputSchema: {
      id: z.number().describe('The identifier of the activity')
    },
    handler: async (args: any) => {
      try {
        logger.info('Fetching activity zones', { args });
        
        const { id } = args;
        
        const response = await stravaClient.activities.getZonesByActivityId(id);
        
        logger.info(`Retrieved zones for activity ${id}`);
        
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                zones: response.data,
                activityId: id
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        logger.error('Error fetching activity zones:', error);
        throw new Error(`Failed to fetch zones: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
]; 