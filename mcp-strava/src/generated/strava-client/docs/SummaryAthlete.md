# SummaryAthlete


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of the athlete | [optional] [default to undefined]
**resource_state** | **number** | Resource state, indicates level of detail. Possible values: 1 -&gt; \&quot;meta\&quot;, 2 -&gt; \&quot;summary\&quot;, 3 -&gt; \&quot;detail\&quot; | [optional] [default to undefined]
**firstname** | **string** | The athlete\&#39;s first name. | [optional] [default to undefined]
**lastname** | **string** | The athlete\&#39;s last name. | [optional] [default to undefined]
**profile_medium** | **string** | URL to a 62x62 pixel profile picture. | [optional] [default to undefined]
**profile** | **string** | URL to a 124x124 pixel profile picture. | [optional] [default to undefined]
**city** | **string** | The athlete\&#39;s city. | [optional] [default to undefined]
**state** | **string** | The athlete\&#39;s state or geographical region. | [optional] [default to undefined]
**country** | **string** | The athlete\&#39;s country. | [optional] [default to undefined]
**sex** | **string** | The athlete\&#39;s sex. | [optional] [default to undefined]
**premium** | **boolean** | Deprecated.  Use summit field instead. Whether the athlete has any Summit subscription. | [optional] [default to undefined]
**summit** | **boolean** | Whether the athlete has any Summit subscription. | [optional] [default to undefined]
**created_at** | **string** | The time at which the athlete was created. | [optional] [default to undefined]
**updated_at** | **string** | The time at which the athlete was last updated. | [optional] [default to undefined]

## Example

```typescript
import { SummaryAthlete } from './api';

const instance: SummaryAthlete = {
    id,
    resource_state,
    firstname,
    lastname,
    profile_medium,
    profile,
    city,
    state,
    country,
    sex,
    premium,
    summit,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
