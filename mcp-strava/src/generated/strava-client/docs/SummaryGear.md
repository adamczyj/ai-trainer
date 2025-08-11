# SummaryGear


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The gear\&#39;s unique identifier. | [optional] [default to undefined]
**resource_state** | **number** | Resource state, indicates level of detail. Possible values: 2 -&gt; \&quot;summary\&quot;, 3 -&gt; \&quot;detail\&quot; | [optional] [default to undefined]
**primary** | **boolean** | Whether this gear\&#39;s is the owner\&#39;s default one. | [optional] [default to undefined]
**name** | **string** | The gear\&#39;s name. | [optional] [default to undefined]
**distance** | **number** | The distance logged with this gear. | [optional] [default to undefined]

## Example

```typescript
import { SummaryGear } from './api';

const instance: SummaryGear = {
    id,
    resource_state,
    primary,
    name,
    distance,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
