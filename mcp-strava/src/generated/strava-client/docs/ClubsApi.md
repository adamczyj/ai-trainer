# ClubsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getClubActivitiesById**](#getclubactivitiesbyid) | **GET** /clubs/{id}/activities | List Club Activities|
|[**getClubAdminsById**](#getclubadminsbyid) | **GET** /clubs/{id}/admins | List Club Administrators|
|[**getClubById**](#getclubbyid) | **GET** /clubs/{id} | Get Club|
|[**getClubMembersById**](#getclubmembersbyid) | **GET** /clubs/{id}/members | List Club Members|
|[**getLoggedInAthleteClubs**](#getloggedinathleteclubs) | **GET** /athlete/clubs | List Athlete Clubs|

# **getClubActivitiesById**
> Array<ClubActivity> getClubActivitiesById()

Retrieve recent activities from members of a specific club. The authenticated athlete must belong to the requested club in order to hit this endpoint. Pagination is supported. Athlete profile visibility is respected for all activities.

### Example

```typescript
import {
    ClubsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClubsApi(configuration);

let id: number; //The identifier of the club. (default to undefined)
let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getClubActivitiesById(
    id,
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the club. | defaults to undefined|
| **page** | [**number**] | Page number. Defaults to 1. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<ClubActivity>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of activities. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getClubAdminsById**
> Array<SummaryAthlete> getClubAdminsById()

Returns a list of the administrators of a given club.

### Example

```typescript
import {
    ClubsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClubsApi(configuration);

let id: number; //The identifier of the club. (default to undefined)
let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getClubAdminsById(
    id,
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the club. | defaults to undefined|
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
|**200** | A list of summary athlete representations. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getClubById**
> DetailedClub getClubById()

Returns a given a club using its identifier.

### Example

```typescript
import {
    ClubsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClubsApi(configuration);

let id: number; //The identifier of the club. (default to undefined)

const { status, data } = await apiInstance.getClubById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the club. | defaults to undefined|


### Return type

**DetailedClub**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The detailed representation of a club. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getClubMembersById**
> Array<ClubAthlete> getClubMembersById()

Returns a list of the athletes who are members of a given club.

### Example

```typescript
import {
    ClubsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClubsApi(configuration);

let id: number; //The identifier of the club. (default to undefined)
let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getClubMembersById(
    id,
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the club. | defaults to undefined|
| **page** | [**number**] | Page number. Defaults to 1. | (optional) defaults to undefined|
| **perPage** | [**number**] | Number of items per page. Defaults to 30. | (optional) defaults to 30|


### Return type

**Array<ClubAthlete>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of club athlete representations. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLoggedInAthleteClubs**
> Array<SummaryClub> getLoggedInAthleteClubs()

Returns a list of the clubs whose membership includes the authenticated athlete.

### Example

```typescript
import {
    ClubsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClubsApi(configuration);

let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getLoggedInAthleteClubs(
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

**Array<SummaryClub>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of summary club representations. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

