# Comment


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of this comment | [optional] [default to undefined]
**activity_id** | **number** | The identifier of the activity this comment is related to | [optional] [default to undefined]
**text** | **string** | The content of the comment | [optional] [default to undefined]
**athlete** | [**SummaryAthlete**](SummaryAthlete.md) |  | [optional] [default to undefined]
**created_at** | **string** | The time at which this comment was created. | [optional] [default to undefined]

## Example

```typescript
import { Comment } from './api';

const instance: Comment = {
    id,
    activity_id,
    text,
    athlete,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
