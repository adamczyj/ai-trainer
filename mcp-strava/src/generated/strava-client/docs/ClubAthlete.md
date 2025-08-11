# ClubAthlete


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**resource_state** | **number** | Resource state, indicates level of detail. Possible values: 1 -&gt; \&quot;meta\&quot;, 2 -&gt; \&quot;summary\&quot;, 3 -&gt; \&quot;detail\&quot; | [optional] [default to undefined]
**firstname** | **string** | The athlete\&#39;s first name. | [optional] [default to undefined]
**lastname** | **string** | The athlete\&#39;s last initial. | [optional] [default to undefined]
**member** | **string** | The athlete\&#39;s member status. | [optional] [default to undefined]
**admin** | **boolean** | Whether the athlete is a club admin. | [optional] [default to undefined]
**owner** | **boolean** | Whether the athlete is club owner. | [optional] [default to undefined]

## Example

```typescript
import { ClubAthlete } from './api';

const instance: ClubAthlete = {
    resource_state,
    firstname,
    lastname,
    member,
    admin,
    owner,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
