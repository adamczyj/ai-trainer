# StreamsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getActivityStreams**](#getactivitystreams) | **GET** /activities/{id}/streams | Get Activity Streams|
|[**getRouteStreams**](#getroutestreams) | **GET** /routes/{id}/streams | Get Route Streams|
|[**getSegmentEffortStreams**](#getsegmenteffortstreams) | **GET** /segment_efforts/{id}/streams | Get Segment Effort Streams|
|[**getSegmentStreams**](#getsegmentstreams) | **GET** /segments/{id}/streams | Get Segment Streams|

# **getActivityStreams**
> StreamSet getActivityStreams()

Returns the given activity\'s streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.

### Example

```typescript
import {
    StreamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StreamsApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)
let keys: Array<'time' | 'distance' | 'latlng' | 'altitude' | 'velocity_smooth' | 'heartrate' | 'cadence' | 'watts' | 'temp' | 'moving' | 'grade_smooth'>; //Desired stream types. (default to undefined)
let keyByType: boolean; //Must be true. (default to true)

const { status, data } = await apiInstance.getActivityStreams(
    id,
    keys,
    keyByType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|
| **keys** | **Array<&#39;time&#39; &#124; &#39;distance&#39; &#124; &#39;latlng&#39; &#124; &#39;altitude&#39; &#124; &#39;velocity_smooth&#39; &#124; &#39;heartrate&#39; &#124; &#39;cadence&#39; &#124; &#39;watts&#39; &#124; &#39;temp&#39; &#124; &#39;moving&#39; &#124; &#39;grade_smooth&#39;>** | Desired stream types. | defaults to undefined|
| **keyByType** | [**boolean**] | Must be true. | defaults to true|


### Return type

**StreamSet**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The set of requested streams. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRouteStreams**
> StreamSet getRouteStreams()

Returns the given route\'s streams. Requires read_all scope for private routes.

### Example

```typescript
import {
    StreamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StreamsApi(configuration);

let id: number; //The identifier of the route. (default to undefined)

const { status, data } = await apiInstance.getRouteStreams(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the route. | defaults to undefined|


### Return type

**StreamSet**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The set of requested streams. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSegmentEffortStreams**
> StreamSet getSegmentEffortStreams()

Returns a set of streams for a segment effort completed by the authenticated athlete. Requires read_all scope.

### Example

```typescript
import {
    StreamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StreamsApi(configuration);

let id: number; //The identifier of the segment effort. (default to undefined)
let keys: Array<'time' | 'distance' | 'latlng' | 'altitude' | 'velocity_smooth' | 'heartrate' | 'cadence' | 'watts' | 'temp' | 'moving' | 'grade_smooth'>; //The types of streams to return. (default to undefined)
let keyByType: boolean; //Must be true. (default to true)

const { status, data } = await apiInstance.getSegmentEffortStreams(
    id,
    keys,
    keyByType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the segment effort. | defaults to undefined|
| **keys** | **Array<&#39;time&#39; &#124; &#39;distance&#39; &#124; &#39;latlng&#39; &#124; &#39;altitude&#39; &#124; &#39;velocity_smooth&#39; &#124; &#39;heartrate&#39; &#124; &#39;cadence&#39; &#124; &#39;watts&#39; &#124; &#39;temp&#39; &#124; &#39;moving&#39; &#124; &#39;grade_smooth&#39;>** | The types of streams to return. | defaults to undefined|
| **keyByType** | [**boolean**] | Must be true. | defaults to true|


### Return type

**StreamSet**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The set of requested streams. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSegmentStreams**
> StreamSet getSegmentStreams()

Returns the given segment\'s streams. Requires read_all scope for private segments.

### Example

```typescript
import {
    StreamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StreamsApi(configuration);

let id: number; //The identifier of the segment. (default to undefined)
let keys: Array<'distance' | 'latlng' | 'altitude'>; //The types of streams to return. (default to undefined)
let keyByType: boolean; //Must be true. (default to true)

const { status, data } = await apiInstance.getSegmentStreams(
    id,
    keys,
    keyByType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the segment. | defaults to undefined|
| **keys** | **Array<&#39;distance&#39; &#124; &#39;latlng&#39; &#124; &#39;altitude&#39;>** | The types of streams to return. | defaults to undefined|
| **keyByType** | [**boolean**] | Must be true. | defaults to true|


### Return type

**StreamSet**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The set of requested streams. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

