# SummaryActivity


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of the activity | [optional] [default to undefined]
**external_id** | **string** | The identifier provided at upload time | [optional] [default to undefined]
**upload_id** | **number** | The identifier of the upload that resulted in this activity | [optional] [default to undefined]
**athlete** | [**MetaAthlete**](MetaAthlete.md) |  | [optional] [default to undefined]
**name** | **string** | The name of the activity | [optional] [default to undefined]
**distance** | **number** | The activity\&#39;s distance, in meters | [optional] [default to undefined]
**moving_time** | **number** | The activity\&#39;s moving time, in seconds | [optional] [default to undefined]
**elapsed_time** | **number** | The activity\&#39;s elapsed time, in seconds | [optional] [default to undefined]
**total_elevation_gain** | **number** | The activity\&#39;s total elevation gain. | [optional] [default to undefined]
**elev_high** | **number** | The activity\&#39;s highest elevation, in meters | [optional] [default to undefined]
**elev_low** | **number** | The activity\&#39;s lowest elevation, in meters | [optional] [default to undefined]
**type** | [**ActivityType**](ActivityType.md) |  | [optional] [default to undefined]
**sport_type** | [**SportType**](SportType.md) |  | [optional] [default to undefined]
**start_date** | **string** | The time at which the activity was started. | [optional] [default to undefined]
**start_date_local** | **string** | The time at which the activity was started in the local timezone. | [optional] [default to undefined]
**timezone** | **string** | The timezone of the activity | [optional] [default to undefined]
**start_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**end_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**achievement_count** | **number** | The number of achievements gained during this activity | [optional] [default to undefined]
**kudos_count** | **number** | The number of kudos given for this activity | [optional] [default to undefined]
**comment_count** | **number** | The number of comments for this activity | [optional] [default to undefined]
**athlete_count** | **number** | The number of athletes for taking part in a group activity | [optional] [default to undefined]
**photo_count** | **number** | The number of Instagram photos for this activity | [optional] [default to undefined]
**total_photo_count** | **number** | The number of Instagram and Strava photos for this activity | [optional] [default to undefined]
**map** | [**PolylineMap**](PolylineMap.md) |  | [optional] [default to undefined]
**trainer** | **boolean** | Whether this activity was recorded on a training machine | [optional] [default to undefined]
**commute** | **boolean** | Whether this activity is a commute | [optional] [default to undefined]
**manual** | **boolean** | Whether this activity was created manually | [optional] [default to undefined]
**_private** | **boolean** | Whether this activity is private | [optional] [default to undefined]
**flagged** | **boolean** | Whether this activity is flagged | [optional] [default to undefined]
**workout_type** | **number** | The activity\&#39;s workout type | [optional] [default to undefined]
**upload_id_str** | **string** | The unique identifier of the upload in string format | [optional] [default to undefined]
**average_speed** | **number** | The activity\&#39;s average speed, in meters per second | [optional] [default to undefined]
**max_speed** | **number** | The activity\&#39;s max speed, in meters per second | [optional] [default to undefined]
**has_kudoed** | **boolean** | Whether the logged-in athlete has kudoed this activity | [optional] [default to undefined]
**hide_from_home** | **boolean** | Whether the activity is muted | [optional] [default to undefined]
**gear_id** | **string** | The id of the gear for the activity | [optional] [default to undefined]
**kilojoules** | **number** | The total work done in kilojoules during this activity. Rides only | [optional] [default to undefined]
**average_watts** | **number** | Average power output in watts during this activity. Rides only | [optional] [default to undefined]
**device_watts** | **boolean** | Whether the watts are from a power meter, false if estimated | [optional] [default to undefined]
**max_watts** | **number** | Rides with power meter data only | [optional] [default to undefined]
**weighted_average_watts** | **number** | Similar to Normalized Power. Rides with power meter data only | [optional] [default to undefined]

## Example

```typescript
import { SummaryActivity } from './api';

const instance: SummaryActivity = {
    id,
    external_id,
    upload_id,
    athlete,
    name,
    distance,
    moving_time,
    elapsed_time,
    total_elevation_gain,
    elev_high,
    elev_low,
    type,
    sport_type,
    start_date,
    start_date_local,
    timezone,
    start_latlng,
    end_latlng,
    achievement_count,
    kudos_count,
    comment_count,
    athlete_count,
    photo_count,
    total_photo_count,
    map,
    trainer,
    commute,
    manual,
    _private,
    flagged,
    workout_type,
    upload_id_str,
    average_speed,
    max_speed,
    has_kudoed,
    hide_from_home,
    gear_id,
    kilojoules,
    average_watts,
    device_watts,
    max_watts,
    weighted_average_watts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
