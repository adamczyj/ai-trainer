import {
  selectFields,
  selectFieldsFromArray,
  getSelectedFieldCount,
  SelectFieldsOptions
} from './selectFields';

describe('selectFields', () => {
  const sampleObject = {
    id: 1,
    name: 'Test Activity',
    description: null,
    distance: 5000,
    tags: undefined,
    emptyString: '',
    emptyArray: [],
    validArray: [1, 2, 3],
    nested: { lat: 40.7128, lng: -74.0060 },
    boolean: false,
    zero: 0
  };

  describe('basic field selection', () => {
    it('should select only specified fields', () => {
      const result = selectFields(sampleObject, ['id', 'name', 'distance']);
      
      expect(result).toEqual({
        id: 1,
        name: 'Test Activity',
        distance: 5000
      });
      expect(Object.keys(result)).toHaveLength(3);
    });

    it('should return empty object when no fields specified', () => {
      const result = selectFields(sampleObject, []);
      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle non-existent fields gracefully', () => {
      const result = selectFields(sampleObject, ['id', 'nonExistent', 'name']);
      
      expect(result).toEqual({
        id: 1,
        name: 'Test Activity'
      });
      expect(Object.keys(result)).toHaveLength(2);
    });
  });

  describe('value filtering options', () => {
    it('should remove null values by default', () => {
      const result = selectFields(sampleObject, ['id', 'name', 'description']);
      
      expect(result).toEqual({
        id: 1,
        name: 'Test Activity'
        // description should be excluded because it's null
      });
      expect(result.hasOwnProperty('description')).toBe(false);
    });

    it('should remove undefined values by default', () => {
      const result = selectFields(sampleObject, ['id', 'name', 'tags']);
      
      expect(result).toEqual({
        id: 1,
        name: 'Test Activity'
        // tags should be excluded because it's undefined
      });
      expect(result.hasOwnProperty('tags')).toBe(false);
    });

    it('should keep null values when removeNull is false', () => {
      const result = selectFields(
        sampleObject, 
        ['id', 'description'], 
        { removeNull: false }
      );
      
      expect(result).toEqual({
        id: 1,
        description: null
      });
    });

    it('should keep undefined values when removeUndefined is false', () => {
      const result = selectFields(
        sampleObject, 
        ['id', 'tags'], 
        { removeUndefined: false }
      );
      
      expect(result).toEqual({
        id: 1,
        tags: undefined
      });
    });

    it('should remove empty strings when removeEmptyStrings is true', () => {
      const result = selectFields(
        sampleObject, 
        ['id', 'emptyString'], 
        { removeEmptyStrings: true }
      );
      
      expect(result).toEqual({
        id: 1
        // emptyString should be excluded
      });
      expect(result.hasOwnProperty('emptyString')).toBe(false);
    });

    it('should keep empty strings by default', () => {
      const result = selectFields(sampleObject, ['id', 'emptyString']);
      
      expect(result).toEqual({
        id: 1,
        emptyString: ''
      });
    });

    it('should remove empty arrays when removeEmptyArrays is true', () => {
      const result = selectFields(
        sampleObject, 
        ['id', 'emptyArray', 'validArray'], 
        { removeEmptyArrays: true }
      );
      
      expect(result).toEqual({
        id: 1,
        validArray: [1, 2, 3]
        // emptyArray should be excluded
      });
      expect(result.hasOwnProperty('emptyArray')).toBe(false);
    });

    it('should keep empty arrays by default', () => {
      const result = selectFields(sampleObject, ['id', 'emptyArray']);
      
      expect(result).toEqual({
        id: 1,
        emptyArray: []
      });
    });
  });

  describe('edge cases', () => {
    it('should handle objects with nested properties', () => {
      const result = selectFields(sampleObject, ['id', 'nested']);
      
      expect(result).toEqual({
        id: 1,
        nested: { lat: 40.7128, lng: -74.0060 }
      });
    });

    it('should handle boolean false values correctly', () => {
      const result = selectFields(sampleObject, ['id', 'boolean']);
      
      expect(result).toEqual({
        id: 1,
        boolean: false
      });
    });

    it('should handle zero values correctly', () => {
      const result = selectFields(sampleObject, ['id', 'zero']);
      
      expect(result).toEqual({
        id: 1,
        zero: 0
      });
    });

    it('should handle empty source object', () => {
      const result = selectFields({}, ['id', 'name']);
      expect(result).toEqual({});
    });
  });
});

describe('selectFieldsFromArray', () => {
  const sampleArray = [
    { id: 1, name: 'Activity 1', distance: 5000, description: null },
    { id: 2, name: 'Activity 2', distance: 3000, tags: undefined },
    { id: 3, name: 'Activity 3', distance: 7000, emptyString: '' }
  ];

  it('should select fields from all objects in array', () => {
    const result = selectFieldsFromArray(sampleArray, ['id', 'name']);
    
    expect(result).toEqual([
      { id: 1, name: 'Activity 1' },
      { id: 2, name: 'Activity 2' },
      { id: 3, name: 'Activity 3' }
    ]);
    expect(result).toHaveLength(3);
  });

  it('should apply filtering options to all objects', () => {
    const result = selectFieldsFromArray(
      sampleArray, 
      ['id', 'description', 'tags'], 
      { removeNull: false, removeUndefined: false }
    );
    
    expect(result).toEqual([
      { id: 1, description: null },
      { id: 2, tags: undefined },
      { id: 3 }
    ]);
  });

  it('should handle empty array', () => {
    const result = selectFieldsFromArray([], ['id', 'name']);
    expect(result).toEqual([]);
  });
});

describe('getSelectedFieldCount', () => {
  const sampleObject = {
    id: 1,
    name: 'Test',
    description: null,
    tags: undefined,
    distance: 5000
  };

  it('should count selected fields correctly', () => {
    const count = getSelectedFieldCount(sampleObject, ['id', 'name', 'distance']);
    expect(count).toBe(3);
  });

  it('should exclude filtered values from count', () => {
    const count = getSelectedFieldCount(sampleObject, ['id', 'description', 'tags', 'distance']);
    expect(count).toBe(2); // description and tags are filtered out by default
  });

  it('should include filtered values when filtering is disabled', () => {
    const count = getSelectedFieldCount(
      sampleObject, 
      ['id', 'description', 'tags', 'distance'],
      { removeNull: false, removeUndefined: false }
    );
    expect(count).toBe(4);
  });

  it('should return 0 for non-existent fields', () => {
    const count = getSelectedFieldCount(sampleObject, ['nonExistent1', 'nonExistent2']);
    expect(count).toBe(0);
  });
});



describe('integration tests', () => {
  it('should work with Strava-like activity data', () => {
    const stravaActivity = {
      id: 123456,
      name: 'Morning Run',
      type: 'Run',
      sport_type: 'Run',
      start_date: '2023-12-01T06:00:00Z',
      distance: 5000.5,
      moving_time: 1800,
      elapsed_time: 1900,
      total_elevation_gain: 45.2,
      average_speed: 2.78,
      kudos_count: 12,
      comment_count: 3,
      start_latlng: null,
      end_latlng: undefined,
      map: { polyline: 'encoded_polyline_data_here' },
      private: false,
      trainer: false
    };

    // Test listView preset equivalent
    const listView = selectFields(stravaActivity, [
      'id', 'name', 'type', 'start_date', 'distance', 'moving_time'
    ]);

    expect(listView).toEqual({
      id: 123456,
      name: 'Morning Run',
      type: 'Run',
      start_date: '2023-12-01T06:00:00Z',
      distance: 5000.5,
      moving_time: 1800
    });

    // Test summary preset equivalent
    const summary = selectFields(stravaActivity, [
      'id', 'name', 'type', 'sport_type', 'start_date', 'distance', 'moving_time',
      'elapsed_time', 'total_elevation_gain', 'average_speed',
      'kudos_count', 'comment_count'
    ]);

    expect(Object.keys(summary)).toHaveLength(12); // All 12 fields should be present
    expect(summary.kudos_count).toBe(12);
    expect(summary.hasOwnProperty('start_latlng')).toBe(false); // null values filtered out
  });
});
