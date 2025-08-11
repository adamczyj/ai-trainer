# DetailedGear


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The gear\&#39;s unique identifier. | [optional] [default to undefined]
**resource_state** | **number** | Resource state, indicates level of detail. Possible values: 2 -&gt; \&quot;summary\&quot;, 3 -&gt; \&quot;detail\&quot; | [optional] [default to undefined]
**primary** | **boolean** | Whether this gear\&#39;s is the owner\&#39;s default one. | [optional] [default to undefined]
**name** | **string** | The gear\&#39;s name. | [optional] [default to undefined]
**distance** | **number** | The distance logged with this gear. | [optional] [default to undefined]
**brand_name** | **string** | The gear\&#39;s brand name. | [optional] [default to undefined]
**model_name** | **string** | The gear\&#39;s model name. | [optional] [default to undefined]
**frame_type** | **number** | The gear\&#39;s frame type (bike only). | [optional] [default to undefined]
**description** | **string** | The gear\&#39;s description. | [optional] [default to undefined]

## Example

```typescript
import { DetailedGear } from './api';

const instance: DetailedGear = {
    id,
    resource_state,
    primary,
    name,
    distance,
    brand_name,
    model_name,
    frame_type,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
