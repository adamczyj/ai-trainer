# Waypoint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**target_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**categories** | **Array&lt;string&gt;** | Categories that the waypoint belongs to | [optional] [default to undefined]
**title** | **string** | A title for the waypoint | [optional] [default to undefined]
**description** | **string** | A description of the waypoint (optional) | [optional] [default to undefined]
**distance_into_route** | **number** | The number meters along the route that the waypoint is located | [optional] [default to undefined]

## Example

```typescript
import { Waypoint } from './api';

const instance: Waypoint = {
    latlng,
    target_latlng,
    categories,
    title,
    description,
    distance_into_route,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
