# UploadsApi

All URIs are relative to *https://www.strava.com/api/v3*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUpload**](#createupload) | **POST** /uploads | Upload Activity|
|[**getUploadById**](#getuploadbyid) | **GET** /uploads/{uploadId} | Get Upload|

# **createUpload**
> Upload createUpload()

Uploads a new data file to create an activity from. Requires activity:write scope.

### Example

```typescript
import {
    UploadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadsApi(configuration);

let file: File; //The uploaded file. (optional) (default to undefined)
let name: string; //The desired name of the resulting activity. (optional) (default to undefined)
let description: string; //The desired description of the resulting activity. (optional) (default to undefined)
let trainer: string; //Whether the resulting activity should be marked as having been performed on a trainer. (optional) (default to undefined)
let commute: string; //Whether the resulting activity should be tagged as a commute. (optional) (default to undefined)
let dataType: string; //The format of the uploaded file. (optional) (default to undefined)
let externalId: string; //The desired external identifier of the resulting activity. (optional) (default to undefined)

const { status, data } = await apiInstance.createUpload(
    file,
    name,
    description,
    trainer,
    commute,
    dataType,
    externalId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] | The uploaded file. | (optional) defaults to undefined|
| **name** | [**string**] | The desired name of the resulting activity. | (optional) defaults to undefined|
| **description** | [**string**] | The desired description of the resulting activity. | (optional) defaults to undefined|
| **trainer** | [**string**] | Whether the resulting activity should be marked as having been performed on a trainer. | (optional) defaults to undefined|
| **commute** | [**string**] | Whether the resulting activity should be tagged as a commute. | (optional) defaults to undefined|
| **dataType** | [**string**]**Array<&#39;fit&#39; &#124; &#39;fit.gz&#39; &#124; &#39;tcx&#39; &#124; &#39;tcx.gz&#39; &#124; &#39;gpx&#39; &#124; &#39;gpx.gz&#39;>** | The format of the uploaded file. | (optional) defaults to undefined|
| **externalId** | [**string**] | The desired external identifier of the resulting activity. | (optional) defaults to undefined|


### Return type

**Upload**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | A representation of the created upload. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUploadById**
> Upload getUploadById()

Returns an upload for a given identifier. Requires activity:write scope.

### Example

```typescript
import {
    UploadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadsApi(configuration);

let uploadId: number; //The identifier of the upload. (default to undefined)

const { status, data } = await apiInstance.getUploadById(
    uploadId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadId** | [**number**] | The identifier of the upload. | defaults to undefined|


### Return type

**Upload**

### Authorization

[strava_oauth](../README.md#strava_oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Representation of the upload. |  -  |
|**0** | Unexpected error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

