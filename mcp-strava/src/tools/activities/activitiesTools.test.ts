import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { activitiesTools } from './activitiesTools';
import { stravaClient } from '../../strava/stravaClient';

// Mock the stravaClien
jest.mock('@src/strava/stravaClient', () => ({
  stravaClient: {
    activities: {
      getLoggedInAthleteActivities: jest.fn()
    }
  }
}));

// Mock the logger
jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

describe('activitiesTools', () => {
  const mockStravaClient = stravaClient as jest.Mocked<typeof stravaClient>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get_athlete_activities', () => {
    const tool = activitiesTools.find(t => t.name === 'get_athlete_activities');
    
    if (!tool) {
      throw new Error('get_athlete_activities tool not found');
    }

    it('should have correct schema with fields and preset parameters', () => {
      expect(tool.inputSchema).toHaveProperty('fields');
      expect(tool.inputSchema).toHaveProperty('preset');
      // Note: ZodRawShape doesn't have .default or .enum properties like JSON Schema
      // The validation happens at runtime, not at schema definition time
    });

    it('should use listView preset by default', async () => {
      const mockActivities = [
        {
          id: 1,
          name: 'Morning Run',
          type: 'Run',
          sport_type: 'Run',
          start_date: '2024-01-01T08:00:00Z',
          distance: 5000,
          moving_time: 1800,
          elapsed_time: 2000,
          total_elevation_gain: 100,
          average_speed: 2.78,
          kudos_count: 5,
          comment_count: 2,
          achievement_count: 1,
          start_latlng: [40.7128, -74.0060],
          map: { polyline: 'mock-polyline' }
        }
      ];

      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      const result = await tool.handler({ page: 1, perPage: 1 });
      const content = JSON.parse(result.content[0].text);

      // Should only include listView fields (6 fields)
      expect(content.activities[0]).toHaveProperty('id');
      expect(content.activities[0]).toHaveProperty('name');
      expect(content.activities[0]).toHaveProperty('type');
      expect(content.activities[0]).toHaveProperty('start_date');
      expect(content.activities[0]).toHaveProperty('distance');
      expect(content.activities[0]).toHaveProperty('moving_time');
      
      // Should NOT include these fields
      expect(content.activities[0]).not.toHaveProperty('sport_type');
      expect(content.activities[0]).not.toHaveProperty('start_latlng');
      expect(content.activities[0]).not.toHaveProperty('map');

      expect(content.fieldSelection.preset).toBe('listView');
      expect(content.fieldSelection.totalFields).toBe(6);
    });

    it('should use custom fields when provided', async () => {
      const mockActivities = [
        {
          id: 1,
          name: 'Morning Run',
          type: 'Run',
          distance: 5000,
          moving_time: 1800,
          kudos_count: 5
        }
      ];

      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      const customFields = ['id', 'name', 'kudos_count'];
      const result = await tool.handler({ page: 1, perPage: 1, fields: customFields });
      const content = JSON.parse(result.content[0].text);

      expect(content.activities[0]).toHaveProperty('id');
      expect(content.activities[0]).toHaveProperty('name');
      expect(content.activities[0]).toHaveProperty('kudos_count');
      expect(content.activities[0]).not.toHaveProperty('type');
      expect(content.activities[0]).not.toHaveProperty('distance');

      expect(content.fieldSelection.preset).toBe('custom');
      expect(content.fieldSelection.totalFields).toBe(3);
    });

    it('should use summary preset when specified', async () => {
      const mockActivities = [
        {
          id: 1,
          name: 'Morning Run',
          type: 'Run',
          sport_type: 'Run',
          start_date: '2024-01-01T08:00:00Z',
          distance: 5000,
          moving_time: 1800,
          elapsed_time: 2000,
          total_elevation_gain: 100,
          average_speed: 2.78,
          kudos_count: 5,
          comment_count: 2,
          achievement_count: 1
        }
      ];

      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      const result = await tool.handler({ page: 1, perPage: 1, preset: 'summary' });
      const content = JSON.parse(result.content[0].text);

      // Should include summary fields (13 fields)
      expect(content.fieldSelection.preset).toBe('summary');
      expect(content.fieldSelection.totalFields).toBe(13);
    });

    it('should not include pretty printing in JSON output', async () => {
      const mockActivities = [{ id: 1, name: 'Test' }];
      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      const result = await tool.handler({ page: 1, perPage: 1 });
      const jsonString = result.content[0].text;
      
      // Should be compact JSON (no pretty printing)
      expect(jsonString).not.toContain('\n');
      expect(jsonString).not.toContain('  '); // No indentation
    });

    it('should fall back to preset when fields array is empty', async () => {
      const mockActivities = [
        {
          id: 1,
          name: 'Morning Run',
          type: 'Run',
          sport_type: 'Run',
          start_date: '2024-01-01T08:00:00Z',
          distance: 5000,
          moving_time: 1800,
          elapsed_time: 2000,
          total_elevation_gain: 100,
          average_speed: 2.78,
          kudos_count: 5,
          comment_count: 2,
          achievement_count: 1
        }
      ];

      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      // Test with empty fields array
      const result = await tool.handler({ page: 1, perPage: 1, fields: [], preset: 'summary' });
      const content = JSON.parse(result.content[0].text);

      // Should fall back to summary preset (13 fields) instead of empty custom fields
      expect(content.fieldSelection.preset).toBe('summary');
      expect(content.fieldSelection.totalFields).toBe(13);
      
      // Should include summary preset fields
      expect(content.activities[0]).toHaveProperty('id');
      expect(content.activities[0]).toHaveProperty('name');
      expect(content.activities[0]).toHaveProperty('type');
      expect(content.activities[0]).toHaveProperty('sport_type');
      expect(content.activities[0]).toHaveProperty('start_date');
      expect(content.activities[0]).toHaveProperty('distance');
      expect(content.activities[0]).toHaveProperty('moving_time');
      expect(content.activities[0]).toHaveProperty('elapsed_time');
      expect(content.activities[0]).toHaveProperty('total_elevation_gain');
      expect(content.activities[0]).toHaveProperty('average_speed');
      expect(content.activities[0]).toHaveProperty('kudos_count');
      expect(content.activities[0]).toHaveProperty('comment_count');
      expect(content.activities[0]).toHaveProperty('achievement_count');
    });

    it('should fall back to preset when fields array is undefined', async () => {
      const mockActivities = [
        {
          id: 1,
          name: 'Morning Run',
          type: 'Run',
          sport_type: 'Run',
          start_date: '2024-01-01T08:00:00Z',
          distance: 5000,
          moving_time: 1800,
          elapsed_time: 2000,
          total_elevation_gain: 100,
          average_speed: 2.78,
          kudos_count: 5,
          comment_count: 2,
          achievement_count: 1,
          start_latlng: [40.7128, -74.0060],
          map: { polyline: 'mock-polyline' }
        }
      ];

      mockStravaClient.activities.getLoggedInAthleteActivities.mockResolvedValue({
        data: mockActivities
      } as any);

      // Test with undefined fields
      const result = await tool.handler({ page: 1, perPage: 1, fields: undefined, preset: 'listView' });
      const content = JSON.parse(result.content[0].text);

      // Should use listView preset (6 fields)
      expect(content.fieldSelection.preset).toBe('listView');
      expect(content.fieldSelection.totalFields).toBe(6);
      
      // Should include listView preset fields
      expect(content.activities[0]).toHaveProperty('id');
      expect(content.activities[0]).toHaveProperty('name');
      expect(content.activities[0]).toHaveProperty('type');
      expect(content.activities[0]).toHaveProperty('start_date');
      expect(content.activities[0]).toHaveProperty('distance');
      expect(content.activities[0]).toHaveProperty('moving_time');
    });
  });
});
