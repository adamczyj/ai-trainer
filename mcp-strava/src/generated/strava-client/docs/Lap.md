# Lap


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of this lap | [optional] [default to undefined]
**activity** | [**MetaActivity**](MetaActivity.md) |  | [optional] [default to undefined]
**athlete** | [**MetaAthlete**](MetaAthlete.md) |  | [optional] [default to undefined]
**average_cadence** | **number** | The lap\&#39;s average cadence | [optional] [default to undefined]
**average_speed** | **number** | The lap\&#39;s average speed | [optional] [default to undefined]
**distance** | **number** | The lap\&#39;s distance, in meters | [optional] [default to undefined]
**elapsed_time** | **number** | The lap\&#39;s elapsed time, in seconds | [optional] [default to undefined]
**start_index** | **number** | The start index of this effort in its activity\&#39;s stream | [optional] [default to undefined]
**end_index** | **number** | The end index of this effort in its activity\&#39;s stream | [optional] [default to undefined]
**lap_index** | **number** | The index of this lap in the activity it belongs to | [optional] [default to undefined]
**max_speed** | **number** | The maximum speed of this lat, in meters per second | [optional] [default to undefined]
**moving_time** | **number** | The lap\&#39;s moving time, in seconds | [optional] [default to undefined]
**name** | **string** | The name of the lap | [optional] [default to undefined]
**pace_zone** | **number** | The athlete\&#39;s pace zone during this lap | [optional] [default to undefined]
**split** | **number** |  | [optional] [default to undefined]
**start_date** | **string** | The time at which the lap was started. | [optional] [default to undefined]
**start_date_local** | **string** | The time at which the lap was started in the local timezone. | [optional] [default to undefined]
**total_elevation_gain** | **number** | The elevation gain of this lap, in meters | [optional] [default to undefined]

## Example

```typescript
import { Lap } from './api';

const instance: Lap = {
    id,
    activity,
    athlete,
    average_cadence,
    average_speed,
    distance,
    elapsed_time,
    start_index,
    end_index,
    lap_index,
    max_speed,
    moving_time,
    name,
    pace_zone,
    split,
    start_date,
    start_date_local,
    total_elevation_gain,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
