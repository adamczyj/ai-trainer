import { Configuration, ActivitiesApi, AthletesApi, ClubsApi, GearsApi, RoutesApi, SegmentEffortsApi, SegmentsApi, StreamsApi, UploadsApi } from '@src/generated/strava-client/index';
import { stravaConfig } from './stravaConfig';
import stravaAxios from '@src/utils/http/stravaAxios';

/**
 * Strava API Client Wrapper
 * Integrates the generated OpenAPI client with our authentication system
 */
export class StravaClient {
  private configuration: Configuration;
  private activitiesApi: ActivitiesApi;
  private athletesApi: AthletesApi;
  private clubsApi: ClubsApi;
  private gearsApi: GearsApi;
  private routesApi: RoutesApi;
  private segmentEffortsApi: SegmentEffortsApi;
  private segmentsApi: SegmentsApi;
  private streamsApi: StreamsApi;
  private uploadsApi: UploadsApi;

  constructor() {
    this.configuration = new Configuration({
      basePath: stravaConfig.baseUrl,
    });

    // Initialize all API clients
    this.activitiesApi = new ActivitiesApi(this.configuration, undefined, stravaAxios);
    this.athletesApi = new AthletesApi(this.configuration, undefined, stravaAxios);
    this.clubsApi = new ClubsApi(this.configuration, undefined, stravaAxios);
    this.gearsApi = new GearsApi(this.configuration, undefined, stravaAxios);
    this.routesApi = new RoutesApi(this.configuration, undefined, stravaAxios);
    this.segmentEffortsApi = new SegmentEffortsApi(this.configuration, undefined, stravaAxios);
    this.segmentsApi = new SegmentsApi(this.configuration, undefined, stravaAxios);
    this.streamsApi = new StreamsApi(this.configuration, undefined, stravaAxios);
    this.uploadsApi = new UploadsApi(this.configuration, undefined, stravaAxios);
  }

  /**
   * Get the activities API client
   */
  get activities(): ActivitiesApi {
    return this.activitiesApi;
  }

  /**
   * Get the athletes API client
   */
  get athletes(): AthletesApi {
    return this.athletesApi;
  }

  /**
   * Get the clubs API client
   */
  get clubs(): ClubsApi {
    return this.clubsApi;
  }

  /**
   * Get the gears API client
   */
  get gears(): GearsApi {
    return this.gearsApi;
  }

  /**
   * Get the routes API client
   */
  get routes(): RoutesApi {
    return this.routesApi;
  }

  /**
   * Get the segment efforts API client
   */
  get segmentEfforts(): SegmentEffortsApi {
    return this.segmentEffortsApi;
  }

  /**
   * Get the segments API client
   */
  get segments(): SegmentsApi {
    return this.segmentsApi;
  }

  /**
   * Get the streams API client
   */
  get streams(): StreamsApi {
    return this.streamsApi;
  }

  /**
   * Get the uploads API client
   */
  get uploads(): UploadsApi {
    return this.uploadsApi;
  }

  /**
   * Check if the client is properly authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await stravaConfig.hasValidTokens();
  }
}

/**
 * Create and return a configured Strava client instance
 */
export function createStravaClient(): StravaClient {
  return new StravaClient();
}

/**
 * Default client instance
 */
export const stravaClient = createStravaClient(); 