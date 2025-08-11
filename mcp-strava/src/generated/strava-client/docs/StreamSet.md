# StreamSet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**time** | [**TimeStream**](TimeStream.md) |  | [optional] [default to undefined]
**distance** | [**DistanceStream**](DistanceStream.md) |  | [optional] [default to undefined]
**latlng** | [**LatLngStream**](LatLngStream.md) |  | [optional] [default to undefined]
**altitude** | [**AltitudeStream**](AltitudeStream.md) |  | [optional] [default to undefined]
**velocity_smooth** | [**SmoothVelocityStream**](SmoothVelocityStream.md) |  | [optional] [default to undefined]
**heartrate** | [**HeartrateStream**](HeartrateStream.md) |  | [optional] [default to undefined]
**cadence** | [**CadenceStream**](CadenceStream.md) |  | [optional] [default to undefined]
**watts** | [**PowerStream**](PowerStream.md) |  | [optional] [default to undefined]
**temp** | [**TemperatureStream**](TemperatureStream.md) |  | [optional] [default to undefined]
**moving** | [**MovingStream**](MovingStream.md) |  | [optional] [default to undefined]
**grade_smooth** | [**SmoothGradeStream**](SmoothGradeStream.md) |  | [optional] [default to undefined]

## Example

```typescript
import { StreamSet } from './api';

const instance: StreamSet = {
    time,
    distance,
    latlng,
    altitude,
    velocity_smooth,
    heartrate,
    cadence,
    watts,
    temp,
    moving,
    grade_smooth,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
