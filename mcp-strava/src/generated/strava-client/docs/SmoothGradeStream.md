# SmoothGradeStream


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**original_size** | **number** | The number of data points in this stream | [optional] [default to undefined]
**resolution** | **string** | The level of detail (sampling) in which this stream was returned | [optional] [default to undefined]
**series_type** | **string** | The base series used in the case the stream was downsampled | [optional] [default to undefined]
**data** | **Array&lt;number&gt;** | The sequence of grade values for this stream, as percents of a grade | [optional] [default to undefined]

## Example

```typescript
import { SmoothGradeStream } from './api';

const instance: SmoothGradeStream = {
    original_size,
    resolution,
    series_type,
    data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
