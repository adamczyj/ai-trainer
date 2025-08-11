# ActivityStats

A set of rolled-up statistics and totals for an athlete

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**biggest_ride_distance** | **number** | The longest distance ridden by the athlete. | [optional] [default to undefined]
**biggest_climb_elevation_gain** | **number** | The highest climb ridden by the athlete. | [optional] [default to undefined]
**recent_ride_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**recent_run_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**recent_swim_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**ytd_ride_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**ytd_run_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**ytd_swim_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**all_ride_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**all_run_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]
**all_swim_totals** | [**ActivityTotal**](ActivityTotal.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityStats } from './api';

const instance: ActivityStats = {
    biggest_ride_distance,
    biggest_climb_elevation_gain,
    recent_ride_totals,
    recent_run_totals,
    recent_swim_totals,
    ytd_ride_totals,
    ytd_run_totals,
    ytd_swim_totals,
    all_ride_totals,
    all_run_totals,
    all_swim_totals,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
