# SummaryClub


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The club\&#39;s unique identifier. | [optional] [default to undefined]
**resource_state** | **number** | Resource state, indicates level of detail. Possible values: 1 -&gt; \&quot;meta\&quot;, 2 -&gt; \&quot;summary\&quot;, 3 -&gt; \&quot;detail\&quot; | [optional] [default to undefined]
**name** | **string** | The club\&#39;s name. | [optional] [default to undefined]
**profile_medium** | **string** | URL to a 60x60 pixel profile picture. | [optional] [default to undefined]
**cover_photo** | **string** | URL to a ~1185x580 pixel cover photo. | [optional] [default to undefined]
**cover_photo_small** | **string** | URL to a ~360x176  pixel cover photo. | [optional] [default to undefined]
**sport_type** | **string** | Deprecated. Prefer to use activity_types. | [optional] [default to undefined]
**activity_types** | [**Array&lt;ActivityType&gt;**](ActivityType.md) | The activity types that count for a club. This takes precedence over sport_type. | [optional] [default to undefined]
**city** | **string** | The club\&#39;s city. | [optional] [default to undefined]
**state** | **string** | The club\&#39;s state or geographical region. | [optional] [default to undefined]
**country** | **string** | The club\&#39;s country. | [optional] [default to undefined]
**_private** | **boolean** | Whether the club is private. | [optional] [default to undefined]
**member_count** | **number** | The club\&#39;s member count. | [optional] [default to undefined]
**featured** | **boolean** | Whether the club is featured or not. | [optional] [default to undefined]
**verified** | **boolean** | Whether the club is verified or not. | [optional] [default to undefined]
**url** | **string** | The club\&#39;s vanity URL. | [optional] [default to undefined]

## Example

```typescript
import { SummaryClub } from './api';

const instance: SummaryClub = {
    id,
    resource_state,
    name,
    profile_medium,
    cover_photo,
    cover_photo_small,
    sport_type,
    activity_types,
    city,
    state,
    country,
    _private,
    member_count,
    featured,
    verified,
    url,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
