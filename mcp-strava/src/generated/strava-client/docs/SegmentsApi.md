# SegmentsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**exploreSegments**](#exploresegments) | **GET** /segments/explore | Explore segments|
|[**getLoggedInAthleteStarredSegments**](#getloggedinathletestarredsegments) | **GET** /segments/starred | List Starred Segments|
|[**getSegmentById**](#getsegmentbyid) | **GET** /segments/{id} | Get Segment|
|[**starSegment**](#starsegment) | **PUT** /segments/{id}/starred | Star Segment|

# **exploreSegments**
> ExplorerResponse exploreSegments()

Returns the top 10 segments matching a specified query.

### Example

```typescript
import {
    SegmentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentsApi(configuration);

let bounds: Array<number>; //The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude] (default to undefined)
let activityType: 'running' | 'riding'; //Desired activity type. (optional) (default to undefined)
let minCat: number; //The minimum climbing category. (optional) (default to undefined)
let maxCat: number; //The maximum climbing category. (optional) (default to undefined)

const { status, data } = await apiInstance.exploreSegments(
    bounds,
    activityType,
    minCat,
    maxCat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bounds** | **Array&lt;number&gt;** | The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude] | defaults to undefined|
| **activityType** | [**&#39;running&#39; | &#39;riding&#39;**]**Array<&#39;running&#39; &#124; &#39;riding&#39;>** | Desired activity type. | (optional) defaults to undefined|
| **minCat** | [**number**] | The minimum climbing category. | (optional) defaults to undefined|
| **maxCat** | [**number**] | The maximum climbing category. | (optional) defaults to undefined|


### Return type

**ExplorerResponse**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of matching segments. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLoggedInAthleteStarredSegments**
> Array<SummarySegment> getLoggedInAthleteStarredSegments()

List of the authenticated athlete\'s starred segments. Private segments are filtered out unless requested by a token with read_all scope.

### Example

```typescript
import {
    SegmentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentsApi(configuration);

let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getLoggedInAthleteStarredSegments(
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number. Defaults to 1. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<SummarySegment>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of the authenticated athlete\&#39;s starred segments. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSegmentById**
> DetailedSegment getSegmentById()

Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.

### Example

```typescript
import {
    SegmentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentsApi(configuration);

let id: number; //The identifier of the segment. (default to undefined)

const { status, data } = await apiInstance.getSegmentById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the segment. | defaults to undefined|


### Return type

**DetailedSegment**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Representation of a segment. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **starSegment**
> DetailedSegment starSegment()

Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.

### Example

```typescript
import {
    SegmentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SegmentsApi(configuration);

let id: number; //The identifier of the segment to star. (default to undefined)
let starred: boolean; //If true, star the segment; if false, unstar the segment. (default to false)

const { status, data } = await apiInstance.starSegment(
    id,
    starred
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the segment to star. | defaults to undefined|
| **starred** | [**boolean**] | If true, star the segment; if false, unstar the segment. | defaults to false|


### Return type

**DetailedSegment**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Representation of a segment. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

