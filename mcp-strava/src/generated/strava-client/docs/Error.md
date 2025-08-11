# ModelError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **string** | The code associated with this error. | [optional] [default to undefined]
**field** | **string** | The specific field or aspect of the resource associated with this error. | [optional] [default to undefined]
**resource** | **string** | The type of resource associated with this error. | [optional] [default to undefined]

## Example

```typescript
import { ModelError } from './api';

const instance: ModelError = {
    code,
    field,
    resource,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
