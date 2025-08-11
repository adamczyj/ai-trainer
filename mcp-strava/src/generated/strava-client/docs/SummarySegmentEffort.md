# SummarySegmentEffort


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

## Example

```typescript
import { SummarySegmentEffort } from './api';

const instance: SummarySegmentEffort = {
    id,
    activity_id,
    elapsed_time,
    start_date,
    start_date_local,
    distance,
    is_kom,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
