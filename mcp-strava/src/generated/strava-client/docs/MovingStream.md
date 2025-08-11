# MovingStream


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**original_size** | **number** | The number of data points in this stream | [optional] [default to undefined]
**resolution** | **string** | The level of detail (sampling) in which this stream was returned | [optional] [default to undefined]
**series_type** | **string** | The base series used in the case the stream was downsampled | [optional] [default to undefined]
**data** | **Array&lt;boolean&gt;** | The sequence of moving values for this stream, as boolean values | [optional] [default to undefined]

## Example

```typescript
import { MovingStream } from './api';

const instance: MovingStream = {
    original_size,
    resolution,
    series_type,
    data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
