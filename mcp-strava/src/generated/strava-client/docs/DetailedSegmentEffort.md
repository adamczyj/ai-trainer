# DetailedSegmentEffort


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of this effort | [optional] [default to undefined]
**activity_id** | **number** | The unique identifier of the activity related to this effort | [optional] [default to undefined]
**elapsed_time** | **number** | The effort\&#39;s elapsed time | [optional] [default to undefined]
**start_date** | **string** | The time at which the effort was started. | [optional] [default to undefined]
**start_date_local** | **string** | The time at which the effort was started in the local timezone. | [optional] [default to undefined]
**distance** | **number** | The effort\&#39;s distance in meters | [optional] [default to undefined]
**is_kom** | **boolean** | Whether this effort is the current best on the leaderboard | [optional] [default to undefined]
**name** | **string** | The name of the segment on which this effort was performed | [optional] [default to undefined]
**activity** | [**MetaActivity**](MetaActivity.md) |  | [optional] [default to undefined]
**athlete** | [**MetaAthlete**](MetaAthlete.md) |  | [optional] [default to undefined]
**moving_time** | **number** | The effort\&#39;s moving time | [optional] [default to undefined]
**start_index** | **number** | The start index of this effort in its activity\&#39;s stream | [optional] [default to undefined]
**end_index** | **number** | The end index of this effort in its activity\&#39;s stream | [optional] [default to undefined]
**average_cadence** | **number** | The effort\&#39;s average cadence | [optional] [default to undefined]
**average_watts** | **number** | The average wattage of this effort | [optional] [default to undefined]
**device_watts** | **boolean** | For riding efforts, whether the wattage was reported by a dedicated recording device | [optional] [default to undefined]
**average_heartrate** | **number** | The heart heart rate of the athlete during this effort | [optional] [default to undefined]
**max_heartrate** | **number** | The maximum heart rate of the athlete during this effort | [optional] [default to undefined]
**segment** | [**SummarySegment**](SummarySegment.md) |  | [optional] [default to undefined]
**kom_rank** | **number** | The rank of the effort on the global leaderboard if it belongs in the top 10 at the time of upload | [optional] [default to undefined]
**pr_rank** | **number** | The rank of the effort on the athlete\&#39;s leaderboard if it belongs in the top 3 at the time of upload | [optional] [default to undefined]
**hidden** | **boolean** | Whether this effort should be hidden when viewed within an activity | [optional] [default to undefined]

## Example

```typescript
import { DetailedSegmentEffort } from './api';

const instance: DetailedSegmentEffort = {
    id,
    activity_id,
    elapsed_time,
    start_date,
    start_date_local,
    distance,
    is_kom,
    name,
    activity,
    athlete,
    moving_time,
    start_index,
    end_index,
    average_cadence,
    average_watts,
    device_watts,
    average_heartrate,
    max_heartrate,
    segment,
    kom_rank,
    pr_rank,
    hidden,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
