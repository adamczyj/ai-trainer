# ExplorerSegment


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The unique identifier of this segment | [optional] [default to undefined]
**name** | **string** | The name of this segment | [optional] [default to undefined]
**climb_category** | **number** | The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. If climb_category &#x3D; 5, climb_category_desc &#x3D; HC. If climb_category &#x3D; 2, climb_category_desc &#x3D; 3. | [optional] [default to undefined]
**climb_category_desc** | **string** | The description for the category of the climb | [optional] [default to undefined]
**avg_grade** | **number** | The segment\&#39;s average grade, in percents | [optional] [default to undefined]
**start_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**end_latlng** | **Array&lt;number&gt;** | A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. | [optional] [default to undefined]
**elev_difference** | **number** | The segments\&#39;s evelation difference, in meters | [optional] [default to undefined]
**distance** | **number** | The segment\&#39;s distance, in meters | [optional] [default to undefined]
**points** | **string** | The polyline of the segment | [optional] [default to undefined]

## Example

```typescript
import { ExplorerSegment } from './api';

const instance: ExplorerSegment = {
    id,
    name,
    climb_category,
    climb_category_desc,
    avg_grade,
    start_latlng,
    end_latlng,
    elev_difference,
    distance,
    points,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
