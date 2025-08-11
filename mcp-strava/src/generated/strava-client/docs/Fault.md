# Fault

Encapsulates the errors that may be returned from the API.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**errors** | **Array&lt;Error&gt;** | The set of specific errors associated with this fault, if any. | [optional] [default to undefined]
**message** | **string** | The message of the fault. | [optional] [default to undefined]

## Example

```typescript
import { Fault } from './api';

const instance: Fault = {
    errors,
    message,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
