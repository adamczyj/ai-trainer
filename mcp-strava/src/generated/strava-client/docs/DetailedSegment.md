# DetailedSegment


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of this segment | [optional] [default to undefined]
**name** | **string** | The name of this segment | [optional] [default to undefined]
**activity_type** | **string** |  | [optional] [default to undefined]
**distance** | **number** | The segment\&#39;s distance, in meters | [optional] [default to undefined]
**average_grade** | **number** | The segment\&#39;s average grade, in percents | [optional] [default to undefined]
**maximum_grade** | **number** | The segments\&#39;s maximum grade, in percents | [optional] [default to undefined]
**elevation_high** | **number** | The segments\&#39;s highest elevation, in meters | [optional] [default to undefined]
**elevation_low** | **number** | The segments\&#39;s lowest elevation, in meters | [optional] [default to undefined]
**start_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**end_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**climb_category** | **number** | The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. | [optional] [default to undefined]
**city** | **string** | The segments\&#39;s city. | [optional] [default to undefined]
**state** | **string** | The segments\&#39;s state or geographical region. | [optional] [default to undefined]
**country** | **string** | The segment\&#39;s country. | [optional] [default to undefined]
**_private** | **boolean** | Whether this segment is private. | [optional] [default to undefined]
**athlete_pr_effort** | [**SummaryPRSegmentEffort**](SummaryPRSegmentEffort.md) |  | [optional] [default to undefined]
**athlete_segment_stats** | [**SummarySegmentEffort**](SummarySegmentEffort.md) |  | [optional] [default to undefined]
**created_at** | **string** | The time at which the segment was created. | [optional] [default to undefined]
**updated_at** | **string** | The time at which the segment was last updated. | [optional] [default to undefined]
**total_elevation_gain** | **number** | The segment\&#39;s total elevation gain. | [optional] [default to undefined]
**map** | [**PolylineMap**](PolylineMap.md) |  | [optional] [default to undefined]
**effort_count** | **number** | The total number of efforts for this segment | [optional] [default to undefined]
**athlete_count** | **number** | The number of unique athletes who have an effort for this segment | [optional] [default to undefined]
**hazardous** | **boolean** | Whether this segment is considered hazardous | [optional] [default to undefined]
**star_count** | **number** | The number of stars for this segment | [optional] [default to undefined]

## Example

```typescript
import { DetailedSegment } from './api';

const instance: DetailedSegment = {
    id,
    name,
    activity_type,
    distance,
    average_grade,
    maximum_grade,
    elevation_high,
    elevation_low,
    start_latlng,
    end_latlng,
    climb_category,
    city,
    state,
    country,
    _private,
    athlete_pr_effort,
    athlete_segment_stats,
    created_at,
    updated_at,
    total_elevation_gain,
    map,
    effort_count,
    athlete_count,
    hazardous,
    star_count,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
