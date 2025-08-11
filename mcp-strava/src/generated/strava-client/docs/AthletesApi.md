# AthletesApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLoggedInAthlete**](#getloggedinathlete) | **GET** /athlete | Get Authenticated Athlete|
|[**getLoggedInAthleteZones**](#getloggedinathletezones) | **GET** /athlete/zones | Get Zones|
|[**getStats**](#getstats) | **GET** /athletes/{id}/stats | Get Athlete Stats|
|[**updateLoggedInAthlete**](#updateloggedinathlete) | **PUT** /athlete | Update Athlete|

# **getLoggedInAthlete**
> DetailedAthlete getLoggedInAthlete()

Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.

### Example

```typescript
import {
    AthletesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AthletesApi(configuration);

const { status, data } = await apiInstance.getLoggedInAthlete();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DetailedAthlete**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile information for the authenticated athlete. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLoggedInAthleteZones**
> Zones getLoggedInAthleteZones()

Returns the the authenticated athlete\'s heart rate and power zones. Requires profile:read_all.

### Example

```typescript
import {
    AthletesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AthletesApi(configuration);

const { status, data } = await apiInstance.getLoggedInAthleteZones();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Zones**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Heart rate and power zones. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStats**
> ActivityStats getStats()

Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.

### Example

```typescript
import {
    AthletesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AthletesApi(configuration);

let id: number; //The identifier of the athlete. Must match the authenticated athlete. (default to undefined)

const { status, data } = await apiInstance.getStats(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the athlete. Must match the authenticated athlete. | defaults to undefined|


### Return type

**ActivityStats**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Activity stats of the athlete. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateLoggedInAthlete**
> DetailedAthlete updateLoggedInAthlete()

Update the currently authenticated athlete. Requires profile:write scope.

### Example

```typescript
import {
    AthletesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AthletesApi(configuration);

let weight: number; //The weight of the athlete in kilograms. (default to undefined)

const { status, data } = await apiInstance.updateLoggedInAthlete(
    weight
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **weight** | [**number**] | The weight of the athlete in kilograms. | defaults to undefined|


### Return type

**DetailedAthlete**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile information for the authenticated athlete. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

