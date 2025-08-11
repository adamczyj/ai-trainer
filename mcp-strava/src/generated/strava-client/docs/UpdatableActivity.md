# UpdatableActivity


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**commute** | **boolean** | Whether this activity is a commute | [optional] [default to undefined]
**trainer** | **boolean** | Whether this activity was recorded on a training machine | [optional] [default to undefined]
**hide_from_home** | **boolean** | Whether this activity is muted | [optional] [default to undefined]
**description** | **string** | The description of the activity | [optional] [default to undefined]
**name** | **string** | The name of the activity | [optional] [default to undefined]
**type** | [**ActivityType**](ActivityType.md) |  | [optional] [default to undefined]
**sport_type** | [**SportType**](SportType.md) |  | [optional] [default to undefined]
**gear_id** | **string** | Identifier for the gear associated with the activity. ‘none’ clears gear from activity | [optional] [default to undefined]

## Example

```typescript
import { UpdatableActivity } from './api';

const instance: UpdatableActivity = {
    commute,
    trainer,
    hide_from_home,
    description,
    name,
    type,
    sport_type,
    gear_id,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
