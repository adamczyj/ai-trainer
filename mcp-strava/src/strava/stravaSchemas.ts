import { z } from "zod";

// --- Activity Schemas ---
export const StravaActivitySchema = z.object({
    id: z.number().int().optional(), // Include ID for recent activities
    name: z.string(),
    distance: z.number(),
    start_date: z.string().datetime(),
    // Add other relevant fields from the Strava API response if needed
    // e.g., moving_time: z.number(), type: z.string(), ...
});

export const StravaActivitiesResponseSchema = z.array(StravaActivitySchema);

// --- Athlete Schemas ---
export const BaseAthleteSchema = z.object({
    id: z.number().int(),
    resource_state: z.number().int(),
});

export const DetailedAthleteSchema = BaseAthleteSchema.extend({
    username: z.string().nullable(),
    firstname: z.string(),
    lastname: z.string(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    sex: z.enum(["M", "F"]).nullable(),
    premium: z.boolean(),
    summit: z.boolean(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    profile_medium: z.string().url(),
    profile: z.string().url(),
    weight: z.number().nullable(),
    measurement_preference: z.enum(["feet", "meters"]).optional().nullable(),
    // Add other fields as needed (e.g., follower_count, friend_count, ftp, clubs, bikes, shoes)
});

// Type alias for the inferred athlete type
export type StravaAthlete = z.infer<typeof DetailedAthleteSchema>;

// --- Stats Schemas ---
// Schema for individual activity totals (like runs, rides, swims)
export const ActivityTotalSchema = z.object({
    count: z.number().int(),
    distance: z.number(), // In meters
    moving_time: z.number().int(), // In seconds
    elapsed_time: z.number().int(), // In seconds
    elevation_gain: z.number(), // In meters
    achievement_count: z.number().int().optional().nullable(), // Optional based on Strava docs examples
});

// Schema for the overall athlete stats response
export const ActivityStatsSchema = z.object({
    biggest_ride_distance: z.number().optional().nullable(),
    biggest_climb_elevation_gain: z.number().optional().nullable(),
    recent_ride_totals: ActivityTotalSchema,
    recent_run_totals: ActivityTotalSchema,
    recent_swim_totals: ActivityTotalSchema,
    ytd_ride_totals: ActivityTotalSchema,
    ytd_run_totals: ActivityTotalSchema,
    ytd_swim_totals: ActivityTotalSchema,
    all_ride_totals: ActivityTotalSchema,
    all_run_totals: ActivityTotalSchema,
    all_swim_totals: ActivityTotalSchema,
});
export type StravaStats = z.infer<typeof ActivityStatsSchema>;

// --- Club Schema ---
// Based on https://developers.strava.com/docs/reference/#api-models-SummaryClub
export const SummaryClubSchema = z.object({
    id: z.number().int(),
    resource_state: z.number().int(),
    name: z.string(),
    profile_medium: z.string().url(),
    cover_photo: z.string().url().nullable(),
    cover_photo_small: z.string().url().nullable(),
    sport_type: z.string(), // cycling, running, triathlon, other
    activity_types: z.array(z.string()), // More specific types
    city: z.string(),
    state: z.string(),
    country: z.string(),
    private: z.boolean(),
    member_count: z.number().int(),
    featured: z.boolean(),
    verified: z.boolean(),
    url: z.string().nullable(),
});
export type StravaClub = z.infer<typeof SummaryClubSchema>;
export const StravaClubsResponseSchema = z.array(SummaryClubSchema);

// --- Gear Schema ---
export const SummaryGearSchema = z.object({
    id: z.string(),
    resource_state: z.number().int(),
    primary: z.boolean(),
    name: z.string(),
    distance: z.number(), // Distance in meters for the gear
}).nullable().optional(); // Activity might not have gear or it might be null

// --- Map Schema ---
export const MapSchema = z.object({
    id: z.string(),
    summary_polyline: z.string().optional().nullable(),
    resource_state: z.number().int(),
}).nullable(); // Activity might not have a map

// --- Segment Schema ---
export const SummarySegmentSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    activity_type: z.string(),
    distance: z.number(),
    average_grade: z.number(),
    maximum_grade: z.number(),
    elevation_high: z.number().optional().nullable(),
    elevation_low: z.number().optional().nullable(),
    start_latlng: z.array(z.number()).optional().nullable(),
    end_latlng: z.array(z.number()).optional().nullable(),
    climb_category: z.number().int().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    private: z.boolean().optional(),
    starred: z.boolean().optional(),
});

export const DetailedSegmentSchema = SummarySegmentSchema.extend({
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    total_elevation_gain: z.number().optional().nullable(),
    map: MapSchema, // Now defined above
    effort_count: z.number().int(),
    athlete_count: z.number().int(),
    hazardous: z.boolean(),
    star_count: z.number().int(),
});

export type StravaSegment = z.infer<typeof SummarySegmentSchema>;
export type StravaDetailedSegment = z.infer<typeof DetailedSegmentSchema>;
export const StravaSegmentsResponseSchema = z.array(SummarySegmentSchema);

// --- Explorer Schemas ---
// Based on https://developers.strava.com/docs/reference/#api-models-ExplorerSegment
export const ExplorerSegmentSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    climb_category: z.number().int(),
    climb_category_desc: z.string(), // e.g., "NC", "4", "3", "2", "1", "HC"
    avg_grade: z.number(),
    start_latlng: z.array(z.number()),
    end_latlng: z.array(z.number()),
    elev_difference: z.number(),
    distance: z.number(), // meters
    points: z.string(), // Encoded polyline
    starred: z.boolean().optional(), // Only included if authenticated
});

// Based on https://developers.strava.com/docs/reference/#api-models-ExplorerResponse
export const ExplorerResponseSchema = z.object({
    segments: z.array(ExplorerSegmentSchema),
});
export type StravaExplorerSegment = z.infer<typeof ExplorerSegmentSchema>;
export type StravaExplorerResponse = z.infer<typeof ExplorerResponseSchema>;

// --- Detailed Activity Schema ---
// Based on https://developers.strava.com/docs/reference/#api-models-DetailedActivity
export const DetailedActivitySchema = z.object({
    id: z.number().int(),
    resource_state: z.number().int(), // Should be 3 for detailed
    athlete: BaseAthleteSchema, // Contains athlete ID
    name: z.string(),
    distance: z.number().optional(), // Optional for stationary activities
    moving_time: z.number().int().optional(),
    elapsed_time: z.number().int(),
    total_elevation_gain: z.number().optional(),
    type: z.string(), // e.g., "Run", "Ride"
    sport_type: z.string(),
    start_date: z.string().datetime(),
    start_date_local: z.string().datetime(),
    timezone: z.string(),
    start_latlng: z.array(z.number()).nullable(),
    end_latlng: z.array(z.number()).nullable(),
    achievement_count: z.number().int().optional(),
    kudos_count: z.number().int(),
    comment_count: z.number().int(),
    athlete_count: z.number().int().optional(), // Number of athletes on the activity
    photo_count: z.number().int(),
    map: MapSchema,
    trainer: z.boolean(),
    commute: z.boolean(),
    manual: z.boolean(),
    private: z.boolean(),
    flagged: z.boolean(),
    gear_id: z.string().nullable(), // ID of the gear used
    average_speed: z.number().optional(),
    max_speed: z.number().optional(),
    average_cadence: z.number().optional().nullable(),
    average_temp: z.number().int().optional().nullable(),
    average_watts: z.number().optional().nullable(), // Rides only
    max_watts: z.number().int().optional().nullable(), // Rides only
    weighted_average_watts: z.number().int().optional().nullable(), // Rides only
    kilojoules: z.number().optional().nullable(), // Rides only
    device_watts: z.boolean().optional().nullable(), // Rides only
    has_heartrate: z.boolean(),
    average_heartrate: z.number().optional().nullable(),
    max_heartrate: z.number().optional().nullable(),
    calories: z.number().optional(),
    description: z.string().nullable(),
    // photos: // Add PhotosSummary schema if needed
    gear: SummaryGearSchema,
    device_name: z.string().nullable(),
    // segment_efforts: // Add DetailedSegmentEffort schema if needed
    // splits_metric: // Add Split schema if needed
    // splits_standard: // Add Split schema if needed
    // laps: // Add Lap schema if needed
    // best_efforts: // Add DetailedSegmentEffort schema if needed
});
export type StravaDetailedActivity = z.infer<typeof DetailedActivitySchema>;

// --- Meta Schemas ---
// Based on https://developers.strava.com/docs/reference/#api-models-MetaActivity
export const MetaActivitySchema = z.object({
    id: z.number().int(),
});

// BaseAthleteSchema serves as MetaAthleteSchema (id only needed for effort)

// --- Segment Effort Schema ---
// Based on https://developers.strava.com/docs/reference/#api-models-DetailedSegmentEffort
export const DetailedSegmentEffortSchema = z.object({
    id: z.number().int(),
    activity: MetaActivitySchema,
    athlete: BaseAthleteSchema,
    segment: SummarySegmentSchema, // Reuse SummarySegmentSchema
    name: z.string(), // Segment name
    elapsed_time: z.number().int(), // seconds
    moving_time: z.number().int(), // seconds
    start_date: z.string().datetime(),
    start_date_local: z.string().datetime(),
    distance: z.number(), // meters
    start_index: z.number().int().optional().nullable(),
    end_index: z.number().int().optional().nullable(),
    average_cadence: z.number().optional().nullable(),
    device_watts: z.boolean().optional().nullable(),
    average_watts: z.number().optional().nullable(),
    average_heartrate: z.number().optional().nullable(),
    max_heartrate: z.number().optional().nullable(),
    kom_rank: z.number().int().optional().nullable(), // 1-10, null if not in top 10
    pr_rank: z.number().int().optional().nullable(), // 1, 2, 3, or null
    hidden: z.boolean().optional().nullable(),
});
export type StravaDetailedSegmentEffort = z.infer<typeof DetailedSegmentEffortSchema>;

// --- Route Schema ---
// Based on https://developers.strava.com/docs/reference/#api-models-Route
export const RouteSchema = z.object({
    athlete: BaseAthleteSchema, // Reuse BaseAthleteSchema
    description: z.string().nullable(),
    distance: z.number(), // meters
    elevation_gain: z.number().nullable(), // meters
    id: z.number().int(),
    id_str: z.string(),
    map: MapSchema, // Reuse MapSchema
    map_urls: z.object({ // Assuming structure based on context
        retina_url: z.string().url().optional().nullable(),
        url: z.string().url().optional().nullable(),
    }).optional().nullable(),
    name: z.string(),
    private: z.boolean(),
    resource_state: z.number().int(),
    starred: z.boolean(),
    sub_type: z.number().int(), // 1 for "road", 2 for "mtb", 3 for "cx", 4 for "trail", 5 for "mixed"
    type: z.number().int(), // 1 for "ride", 2 for "run"
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    estimated_moving_time: z.number().int().optional().nullable(), // seconds
    segments: z.array(SummarySegmentSchema).optional().nullable(), // Array of segments within the route
    timestamp: z.number().int().optional().nullable(), // Added based on common patterns
});
export type StravaRoute = z.infer<typeof RouteSchema>;
export const StravaRoutesResponseSchema = z.array(RouteSchema);

// --- Lap Schema ---
// Based on https://developers.strava.com/docs/reference/#api-models-Lap and user-provided image
export const LapSchema = z.object({
    id: z.number().int(),
    resource_state: z.number().int(),
    name: z.string(),
    activity: BaseAthleteSchema, // Reusing BaseAthleteSchema for {id, resource_state}
    athlete: BaseAthleteSchema, // Reusing BaseAthleteSchema for {id, resource_state}
    elapsed_time: z.number().int(), // In seconds
    moving_time: z.number().int(), // In seconds
    start_date: z.string().datetime(),
    start_date_local: z.string().datetime(),
    distance: z.number(), // In meters
    start_index: z.number().int().optional().nullable(), // Index in the activity stream
    end_index: z.number().int().optional().nullable(), // Index in the activity stream
    total_elevation_gain: z.number().optional().nullable(), // In meters
    average_speed: z.number().optional().nullable(), // In meters per second
    max_speed: z.number().optional().nullable(), // In meters per second
    average_cadence: z.number().optional().nullable(), // RPM
    average_watts: z.number().optional().nullable(), // Rides only
    device_watts: z.boolean().optional().nullable(), // Whether power sensor was used
    average_heartrate: z.number().optional().nullable(), // Average heart rate during lap
    max_heartrate: z.number().optional().nullable(), // Max heart rate during lap
    lap_index: z.number().int(), // The position of this lap in the activity
    split: z.number().int().optional().nullable(), // Associated split number (e.g., for marathons)
});

export type StravaLap = z.infer<typeof LapSchema>;
export const StravaLapsResponseSchema = z.array(LapSchema);

// --- Zone Schemas ---
export const DistributionBucketSchema = z.object({
    max: z.number(),
    min: z.number(),
    time: z.number().int(), // Time in seconds spent in this bucket
});

export const ZoneSchema = z.object({
    min: z.number(),
    max: z.number().optional(), // Max might be absent for the last zone
});

export const HeartRateZoneSchema = z.object({
    custom_zones: z.boolean(),
    zones: z.array(ZoneSchema),
    distribution_buckets: z.array(DistributionBucketSchema).optional(), // Optional based on sample
    resource_state: z.number().int().optional(), // Optional based on sample
    sensor_based: z.boolean().optional(), // Optional based on sample
    points: z.number().int().optional(), // Optional based on sample
    type: z.literal('heartrate').optional(), // Optional based on sample
});

export const PowerZoneSchema = z.object({
    zones: z.array(ZoneSchema),
    distribution_buckets: z.array(DistributionBucketSchema).optional(), // Optional based on sample
    resource_state: z.number().int().optional(), // Optional based on sample
    sensor_based: z.boolean().optional(), // Optional based on sample
    points: z.number().int().optional(), // Optional based on sample
    type: z.literal('power').optional(), // Optional based on sample
});

// Combined Zones Response Schema
export const AthleteZonesSchema = z.object({
    heart_rate: HeartRateZoneSchema.optional(), // Heart rate zones might not be set
    power: PowerZoneSchema.optional(), // Power zones might not be set
});

export type StravaAthleteZones = z.infer<typeof AthleteZonesSchema>; 