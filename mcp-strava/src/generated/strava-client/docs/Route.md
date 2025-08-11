# Route


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**athlete** | [**SummaryAthlete**](SummaryAthlete.md) |  | [optional] [default to undefined]
**description** | **string** | The description of the route | [optional] [default to undefined]
**distance** | **number** | The route\&#39;s distance, in meters | [optional] [default to undefined]
**elevation_gain** | **number** | The route\&#39;s elevation gain. | [optional] [default to undefined]
**id** | **number** | The unique identifier of this route | [optional] [default to undefined]
**id_str** | **string** | The unique identifier of the route in string format | [optional] [default to undefined]
**map** | [**PolylineMap**](PolylineMap.md) |  | [optional] [default to undefined]
**name** | **string** | The name of this route | [optional] [default to undefined]
**_private** | **boolean** | Whether this route is private | [optional] [default to undefined]
**starred** | **boolean** | Whether this route is starred by the logged-in athlete | [optional] [default to undefined]
**timestamp** | **number** | An epoch timestamp of when the route was created | [optional] [default to undefined]
**type** | **number** | This route\&#39;s type (1 for ride, 2 for runs) | [optional] [default to undefined]
**sub_type** | **number** | This route\&#39;s sub-type (1 for road, 2 for mountain bike, 3 for cross, 4 for trail, 5 for mixed) | [optional] [default to undefined]
**created_at** | **string** | The time at which the route was created | [optional] [default to undefined]
**updated_at** | **string** | The time at which the route was last updated | [optional] [default to undefined]
**estimated_moving_time** | **number** | Estimated time in seconds for the authenticated athlete to complete route | [optional] [default to undefined]
**segments** | [**Array&lt;SummarySegment&gt;**](SummarySegment.md) | The segments traversed by this route | [optional] [default to undefined]
**waypoints** | [**Array&lt;Waypoint&gt;**](Waypoint.md) | The custom waypoints along this route | [optional] [default to undefined]

## Example

```typescript
import { Route } from './api';

const instance: Route = {
    athlete,
    description,
    distance,
    elevation_gain,
    id,
    id_str,
    map,
    name,
    _private,
    starred,
    timestamp,
    type,
    sub_type,
    created_at,
    updated_at,
    estimated_moving_time,
    segments,
    waypoints,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
