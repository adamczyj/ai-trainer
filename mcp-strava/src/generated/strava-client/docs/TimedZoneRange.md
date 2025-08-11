# TimedZoneRange

A union type representing the time spent in a given zone.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**min** | **number** | The minimum value in the range. | [optional] [default to undefined]
**max** | **number** | The maximum value in the range. | [optional] [default to undefined]
**time** | **number** | The number of seconds spent in this zone | [optional] [default to undefined]

## Example

```typescript
import { TimedZoneRange } from './api';

const instance: TimedZoneRange = {
    min,
    max,
    time,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
