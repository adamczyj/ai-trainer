# RoutesApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getRouteAsGPX**](#getrouteasgpx) | **GET** /routes/{id}/export_gpx | Export Route GPX|
|[**getRouteAsTCX**](#getrouteastcx) | **GET** /routes/{id}/export_tcx | Export Route TCX|
|[**getRouteById**](#getroutebyid) | **GET** /routes/{id} | Get Route|
|[**getRoutesByAthleteId**](#getroutesbyathleteid) | **GET** /athletes/{id}/routes | List Athlete Routes|

# **getRouteAsGPX**
> getRouteAsGPX()

Returns a GPX file of the route. Requires read_all scope for private routes.

### Example

```typescript
import {
    RoutesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutesApi(configuration);

let id: number; //The identifier of the route. (default to undefined)

const { status, data } = await apiInstance.getRouteAsGPX(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the route. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A GPX file with the route. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRouteAsTCX**
> getRouteAsTCX()

Returns a TCX file of the route. Requires read_all scope for private routes.

### Example

```typescript
import {
    RoutesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutesApi(configuration);

let id: number; //The identifier of the route. (default to undefined)

const { status, data } = await apiInstance.getRouteAsTCX(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the route. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A TCX file with the route. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRouteById**
> Route getRouteById()

Returns a route using its identifier. Requires read_all scope for private routes.

### Example

```typescript
import {
    RoutesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutesApi(configuration);

let id: number; //The identifier of the route. (default to undefined)

const { status, data } = await apiInstance.getRouteById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | The identifier of the route. | defaults to undefined|


### Return type

**Route**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A representation of the route. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRoutesByAthleteId**
> Array<Route> getRoutesByAthleteId()

Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.

### Example

```typescript
import {
    RoutesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutesApi(configuration);

let page: number; //Page number. Defaults to 1. (optional) (default to undefined)
let perPage: number; //Number of items per page. Defaults to 30. (optional) (default to 30)

const { status, data } = await apiInstance.getRoutesByAthleteId(
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

**Array<Route>**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A representation of the route. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

