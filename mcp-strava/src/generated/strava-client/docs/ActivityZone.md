# ActivityZone


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**score** | **number** |  | [optional] [default to undefined]
**distribution_buckets** | [**Array&lt;TimedZoneRange&gt;**](TimedZoneRange.md) | Stores the exclusive ranges representing zones and the time spent in each. | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**sensor_based** | **boolean** |  | [optional] [default to undefined]
**points** | **number** |  | [optional] [default to undefined]
**custom_zones** | **boolean** |  | [optional] [default to undefined]
**max** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityZone } from './api';

const instance: ActivityZone = {
    score,
    distribution_buckets,
    type,
    sensor_based,
    points,
    custom_zones,
    max,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
