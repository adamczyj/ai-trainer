# Upload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of the upload | [optional] [default to undefined]
**id_str** | **string** | The unique identifier of the upload in string format | [optional] [default to undefined]
**external_id** | **string** | The external identifier of the upload | [optional] [default to undefined]
**error** | **string** | The error associated with this upload | [optional] [default to undefined]
**status** | **string** | The status of this upload | [optional] [default to undefined]
**activity_id** | **number** | The identifier of the activity this upload resulted into | [optional] [default to undefined]

## Example

```typescript
import { Upload } from './api';

const instance: Upload = {
    id,
    id_str,
    external_id,
    error,
    status,
    activity_id,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
