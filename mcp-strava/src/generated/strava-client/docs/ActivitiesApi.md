# ActivitiesApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createActivity**](#createactivity) | **POST** /activities | Create an Activity|
|[**getActivityById**](#getactivitybyid) | **GET** /activities/{id} | Get Activity|
|[**getCommentsByActivityId**](#getcommentsbyactivityid) | **GET** /activities/{id}/comments | List Activity Comments|
|[**getKudoersByActivityId**](#getkudoersbyactivityid) | **GET** /activities/{id}/kudos | List Activity Kudoers|
|[**getLapsByActivityId**](#getlapsbyactivityid) | **GET** /activities/{id}/laps | List Activity Laps|
|[**getLoggedInAthleteActivities**](#getloggedinathleteactivities) | **GET** /athlete/activities | List Athlete Activities|
|[**getZonesByActivityId**](#getzonesbyactivityid) | **GET** /activities/{id}/zones | Get Activity Zones|
|[**updateActivityById**](#updateactivitybyid) | **PUT** /activities/{id} | Update Activity|

# **createActivity**
> DetailedActivity createActivity()

Creates a manual activity for an athlete, requires activity:write scope.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let name: string; //The name of the activity. (default to undefined)
let sportType: string; //Sport type of activity. For example - Run, MountainBikeRide, Ride, etc. (default to undefined)
let startDateLocal: string; //ISO 8601 formatted date time. (default to undefined)
let elapsedTime: number; //In seconds. (default to undefined)
let type: string; //Type of activity. For example - Run, Ride etc. (optional) (default to undefined)
let description: string; //Description of the activity. (optional) (default to undefined)
let distance: number; //In meters. (optional) (default to undefined)
let trainer: number; //Set to 1 to mark as a trainer activity. (optional) (default to undefined)
let commute: number; //Set to 1 to mark as commute. (optional) (default to undefined)

const { status, data } = await apiInstance.createActivity(
    name,
    sportType,
    startDateLocal,
    elapsedTime,
    type,
    description,
    distance,
    trainer,
    commute
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] | The name of the activity. | defaults to undefined|
| **sportType** | [**string**] | Sport type of activity. For example - Run, MountainBikeRide, Ride, etc. | defaults to undefined|
| **startDateLocal** | [**string**] | ISO 8601 formatted date time. | defaults to undefined|
| **elapsedTime** | [**number**] | In seconds. | defaults to undefined|
| **type** | [**string**] | Type of activity. For example - Run, Ride etc. | (optional) defaults to undefined|
| **description** | [**string**] | Description of the activity. | (optional) defaults to undefined|
| **distance** | [**number**] | In meters. | (optional) defaults to undefined|
| **trainer** | [**number**] | Set to 1 to mark as a trainer activity. | (optional) defaults to undefined|
| **commute** | [**number**] | Set to 1 to mark as commute. | (optional) defaults to undefined|


### Return type

**DetailedActivity**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | The activity\&#39;s detailed representation. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActivityById**
> DetailedActivity getActivityById()

Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)
let includeAllEfforts: boolean; //To include all segments efforts. (optional) (default to undefined)

const { status, data } = await apiInstance.getActivityById(
    id,
    includeAllEfforts
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|
| **includeAllEfforts** | [**boolean**] | To include all segments efforts. | (optional) defaults to undefined|


### Return type

**DetailedActivity**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The activity\&#39;s detailed representation. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCommentsByActivityId**
> Array<Comment> getCommentsByActivityId()

Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)
let page: number; //Deprecated. Prefer to use after_cursor. (optional) (default to undefined)
let perPage: number; //Deprecated. Prefer to use page_size. (optional) (default to 30)
let pageSize: number; //Number of items per page. Defaults to 30. (optional) (default to 30)
let afterCursor: string; //Cursor of the last item in the previous page of results, used to request the subsequent page of results.  When omitted, the first page of results is fetched. (optional) (default to undefined)

const { status, data } = await apiInstance.getCommentsByActivityId(
    id,
    page,
    perPage,
    pageSize,
    afterCursor
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|
| **page** | [**number**] | Deprecated. Prefer to use after_cursor. | (optional) defaults to undefined|
| **perPage** | [**number**] | Deprecated. Prefer to use page_size. | (optional) defaults to 30|
| **pageSize** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|
| **afterCursor** | [**string**] | Cursor of the last item in the previous page of results, used to request the subsequent page of results.  When omitted, the first page of results is fetched. | (optional) defaults to undefined|


### Return type

**Array<Comment>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Comments. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getKudoersByActivityId**
> Array<SummaryAthlete> getKudoersByActivityId()

Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)
let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getKudoersByActivityId(
    id,
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|
| **page** | [**number**] | Page number. Defaults to 1. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<SummaryAthlete>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Comments. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLapsByActivityId**
> Array<Lap> getLapsByActivityId()

Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)

const { status, data } = await apiInstance.getLapsByActivityId(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|


### Return type

**Array<Lap>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Activity Laps. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLoggedInAthleteActivities**
> Array<SummaryActivity> getLoggedInAthleteActivities()

Returns the activities of an athlete for a specific identifier. Requires activity:read. Only Me activities will be filtered out unless requested by a token with activity:read_all.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let before: number; //An epoch timestamp to use for filtering activities that have taken place before a certain time. (optional) (default to undefined)
let after: number; //An epoch timestamp to use for filtering activities that have taken place after a certain time. (optional) (default to undefined)
let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getLoggedInAthleteActivities(
    before,
    after,
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **before** | [**number**] | An epoch timestamp to use for filtering activities that have taken place before a certain time. | (optional) defaults to undefined|
| **after** | [**number**] | An epoch timestamp to use for filtering activities that have taken place after a certain time. | (optional) defaults to undefined|
| **page** | [**number**] | Page number. Defaults to 1. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<SummaryActivity>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The authenticated athlete\&#39;s activities |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getZonesByActivityId**
> Array<ActivityZone> getZonesByActivityId()

Summit Feature. Returns the zones of a given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.

### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)

const { status, data } = await apiInstance.getZonesByActivityId(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|


### Return type

**Array<ActivityZone>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Activity Zones. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateActivityById**
> DetailedActivity updateActivityById()

Updates the given activity that is owned by the authenticated athlete. Requires activity:write. Also requires activity:read_all in order to update Only Me activities

### Example

```typescript
import {
    ActivitiesApi,
    Configuration,
    UpdatableActivity
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let id: number; //The identifier of the activity. (default to undefined)
let body: UpdatableActivity; // (optional)

const { status, data } = await apiInstance.updateActivityById(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **UpdatableActivity**|  | |
| **id** | [**number**] | The identifier of the activity. | defaults to undefined|


### Return type

**DetailedActivity**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The activity\&#39;s detailed representation. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

