import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { StravaClient, createStravaClient, stravaClient } from './stravaClient';
import { ActivitiesApi, AthletesApi, ClubsApi, GearsApi, RoutesApi, SegmentEffortsApi, SegmentsApi, StreamsApi, UploadsApi } from '@src/generated/strava-client';
import { Configuration } from '@src/generated/strava-client';
import stravaAxios from '@src/utils/http/stravaAxios';

// Mock the generated OpenAPI clients
jest.mock('@src/generated/strava-client', () => ({
  Configuration: jest.fn(),
  ActivitiesApi: jest.fn(),
  AthletesApi: jest.fn(),
  ClubsApi: jest.fn(),
  GearsApi: jest.fn(),
  RoutesApi: jest.fn(),
  SegmentEffortsApi: jest.fn(),
  SegmentsApi: jest.fn(),
  StreamsApi: jest.fn(),
  UploadsApi: jest.fn(),
}));

// Mock the stravaAxios instance
jest.mock('@src/utils/http/stravaAxios', () => ({
  __esModule: true,
  default: 'mocked-axios-instance',
}));

// Mock the stravaConfig
jest.mock('./stravaConfig', () => ({
  stravaConfig: {
    baseUrl: 'https://www.strava.com/api/v3',
    hasValidTokens: jest.fn(),
  },
}));

describe('StravaClient', () => {
  let mockConfiguration: jest.Mocked<Configuration>;
  let mockActivitiesApi: jest.Mocked<ActivitiesApi>;
  let mockAthletesApi: jest.Mocked<AthletesApi>;
  let mockClubsApi: jest.Mocked<ClubsApi>;
  let mockGearsApi: jest.Mocked<GearsApi>;
  let mockRoutesApi: jest.Mocked<RoutesApi>;
  let mockSegmentEffortsApi: jest.Mocked<SegmentEffortsApi>;
  let mockSegmentsApi: jest.Mocked<SegmentsApi>;
  let mockStreamsApi: jest.Mocked<StreamsApi>;
  let mockUploadsApi: jest.Mocked<UploadsApi>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock instances
    mockConfiguration = {
      basePath: 'https://www.strava.com/api/v3',
    } as any;
    
    mockActivitiesApi = {} as any;
    mockAthletesApi = {} as any;
    mockClubsApi = {} as any;
    mockGearsApi = {} as any;
    mockRoutesApi = {} as any;
    mockSegmentEffortsApi = {} as any;
    mockSegmentsApi = {} as any;
    mockStreamsApi = {} as any;
    mockUploadsApi = {} as any;

    // Mock the Configuration constructor
    (Configuration as jest.MockedClass<typeof Configuration>).mockImplementation(() => mockConfiguration);
    
    // Mock the API client constructors
    (ActivitiesApi as jest.MockedClass<typeof ActivitiesApi>).mockImplementation(() => mockActivitiesApi);
    (AthletesApi as jest.MockedClass<typeof AthletesApi>).mockImplementation(() => mockAthletesApi);
    (ClubsApi as jest.MockedClass<typeof ClubsApi>).mockImplementation(() => mockClubsApi);
    (GearsApi as jest.MockedClass<typeof GearsApi>).mockImplementation(() => mockGearsApi);
    (RoutesApi as jest.MockedClass<typeof RoutesApi>).mockImplementation(() => mockRoutesApi);
    (SegmentEffortsApi as jest.MockedClass<typeof SegmentEffortsApi>).mockImplementation(() => mockSegmentEffortsApi);
    (SegmentsApi as jest.MockedClass<typeof SegmentsApi>).mockImplementation(() => mockSegmentsApi);
    (StreamsApi as jest.MockedClass<typeof StreamsApi>).mockImplementation(() => mockStreamsApi);
    (UploadsApi as jest.MockedClass<typeof UploadsApi>).mockImplementation(() => mockUploadsApi);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create configuration with correct base URL', () => {
      new StravaClient();
      
      expect(Configuration).toHaveBeenCalledWith({
        basePath: 'https://www.strava.com/api/v3',
      });
    });

    it('should initialize all API clients with configuration and axios instance', () => {
      new StravaClient();
      
      expect(ActivitiesApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(AthletesApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(ClubsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(GearsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(RoutesApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(SegmentEffortsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(SegmentsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(StreamsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
      expect(UploadsApi).toHaveBeenCalledWith(mockConfiguration, undefined, 'mocked-axios-instance');
    });
  });

  describe('getter methods', () => {
    let stravaClient: StravaClient;

    beforeEach(() => {
      stravaClient = new StravaClient();
    });

    it('should return activities API client', () => {
      expect(stravaClient.activities).toBe(mockActivitiesApi);
    });

    it('should return athletes API client', () => {
      expect(stravaClient.athletes).toBe(mockAthletesApi);
    });

    it('should return clubs API client', () => {
      expect(stravaClient.clubs).toBe(mockClubsApi);
    });

    it('should return gears API client', () => {
      expect(stravaClient.gears).toBe(mockGearsApi);
    });

    it('should return routes API client', () => {
      expect(stravaClient.routes).toBe(mockRoutesApi);
    });

    it('should return segment efforts API client', () => {
      expect(stravaClient.segmentEfforts).toBe(mockSegmentEffortsApi);
    });

    it('should return segments API client', () => {
      expect(stravaClient.segments).toBe(mockSegmentsApi);
    });

    it('should return streams API client', () => {
      expect(stravaClient.streams).toBe(mockStreamsApi);
    });

    it('should return uploads API client', () => {
      expect(stravaClient.uploads).toBe(mockUploadsApi);
    });
  });

  describe('isAuthenticated', () => {
    it('should call stravaConfig.hasValidTokens', async () => {
      const { stravaConfig } = require('./stravaConfig');
      const mockHasValidTokens = jest.fn<() => Promise<boolean>>().mockResolvedValue(true);
      (stravaConfig as any).hasValidTokens = mockHasValidTokens;

      const client = new StravaClient();
      const result = await client.isAuthenticated();

      expect(mockHasValidTokens).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false when tokens are invalid', async () => {
      const { stravaConfig } = require('./stravaConfig');
      const mockHasValidTokens = jest.fn<() => Promise<boolean>>().mockResolvedValue(false);
      (stravaConfig as any).hasValidTokens = mockHasValidTokens;

      const client = new StravaClient();
      const result = await client.isAuthenticated();

      expect(result).toBe(false);
    });
  });
});

describe('createStravaClient', () => {
  it('should create and return a new StravaClient instance', () => {
    const client = createStravaClient();
    
    expect(client).toBeInstanceOf(StravaClient);
  });
});

describe('stravaClient (default instance)', () => {
  it('should be an instance of StravaClient', () => {
    expect(stravaClient).toBeInstanceOf(StravaClient);
  });

  it('should be the same instance when imported multiple times', () => {
    const { stravaClient: importedClient } = require('./stravaClient');
    expect(stravaClient).toBe(importedClient);
  });
});
