# SegmentEffortsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getEffortsBySegmentId**](#geteffortsbysegmentid) | **GET** /segment_efforts | List Segment Efforts|
|[**getSegmentEffortById**](#getsegmenteffortbyid) | **GET** /segment_efforts/{id} | Get Segment Effort|

# **getEffortsBySegmentId**
> Array<DetailedSegmentEffort> getEffortsBySegmentId()

Returns a set of the authenticated athlete\'s segment efforts for a given segment.  Requires subscription.

### Example

```typescript
import {
    SegmentEffortsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentEffortsApi(configuration);

let segmentId: number; //The identifier of the segment. (default to undefined)
let startDateLocal: string; //ISO 8601 formatted date time. (optional) (default to undefined)
let endDateLocal: string; //ISO 8601 formatted date time. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getEffortsBySegmentId(
    segmentId,
    startDateLocal,
    endDateLocal,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **segmentId** | [**number**] | The identifier of the segment. | defaults to undefined|
| **startDateLocal** | [**string**] | ISO 8601 formatted date time. | (optional) defaults to undefined|
| **endDateLocal** | [**string**] | ISO 8601 formatted date time. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<DetailedSegmentEffort>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of segment efforts. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSegmentEffortById**
> DetailedSegmentEffort getSegmentEffortById()

Returns a segment effort from an activity that is owned by the authenticated athlete. Requires subscription.

### Example

```typescript
import {
    SegmentEffortsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentEffortsApi(configuration);

let id: number; //The identifier of the segment effort. (default to undefined)

const { status, data } = await apiInstance.getSegmentEffortById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the segment effort. | defaults to undefined|


### Return type

**DetailedSegmentEffort**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Representation of a segment effort. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

