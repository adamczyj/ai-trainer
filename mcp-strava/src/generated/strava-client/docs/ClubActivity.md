# ClubActivity


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**athlete** | [**MetaAthlete**](MetaAthlete.md) |  | [optional] [default to undefined]
**name** | **string** | The name of the activity | [optional] [default to undefined]
**distance** | **number** | The activity\&#39;s distance, in meters | [optional] [default to undefined]
**moving_time** | **number** | The activity\&#39;s moving time, in seconds | [optional] [default to undefined]
**elapsed_time** | **number** | The activity\&#39;s elapsed time, in seconds | [optional] [default to undefined]
**total_elevation_gain** | **number** | The activity\&#39;s total elevation gain. | [optional] [default to undefined]
**type** | [**ActivityType**](ActivityType.md) |  | [optional] [default to undefined]
**sport_type** | [**SportType**](SportType.md) |  | [optional] [default to undefined]
**workout_type** | **number** | The activity\&#39;s workout type | [optional] [default to undefined]

## Example

```typescript
import { ClubActivity } from './api';

const instance: ClubActivity = {
    athlete,
    name,
    distance,
    moving_time,
    elapsed_time,
    total_elevation_gain,
    type,
    sport_type,
    workout_type,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
