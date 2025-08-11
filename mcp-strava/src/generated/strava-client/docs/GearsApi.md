# GearsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getGearById**](#getgearbyid) | **GET** /gear/{id} | Get Equipment|

# **getGearById**
> DetailedGear getGearById()

Returns an equipment using its identifier.

### Example

```typescript
import {
    GearsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GearsApi(configuration);

let id: string; //The identifier of the gear. (default to undefined)

const { status, data } = await apiInstance.getGearById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The identifier of the gear. | defaults to undefined|


### Return type

**DetailedGear**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A representation of the gear. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

