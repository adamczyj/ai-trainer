/**
 * Utility function for selecting specific fields from objects
 * Used to reduce token usage in LLM responses by filtering out unnecessary data
 */

export interface SelectFieldsOptions {
  /** Whether to remove null values from the result */
  removeNull?: boolean;
  /** Whether to remove undefined values from the result */
  removeUndefined?: boolean;
  /** Whether to remove empty strings from the result */
  removeEmptyStrings?: boolean;
  /** Whether to remove empty arrays from the result */
  removeEmptyArrays?: boolean;
}

/**
 * Selects specific fields from a single object
 * @param obj The source object to select fields from
 * @param selectedFields Array of field names to include
 * @param options Optional configuration for filtering values
 * @returns A new object containing only the selected fields
 */
export const selectFields = <T extends Record<string, any>>(
  obj: T,
  selectedFields: string[],
  options: SelectFieldsOptions = {}
): Partial<T> => {
  const {
    removeNull = true,
    removeUndefined = true,
    removeEmptyStrings = false,
    removeEmptyArrays = false
  } = options;

  const result: Partial<T> = {};

  selectedFields.forEach(field => {
    if (obj.hasOwnProperty(field)) {
      const value = obj[field];

      // Apply filtering based on options
      if (removeNull && value === null) return;
      if (removeUndefined && value === undefined) return;
      if (removeEmptyStrings && value === '') return;
      if (removeEmptyArrays && Array.isArray(value) && value.length === 0) return;

      result[field as keyof T] = value;
    }
  });

  return result;
};

/**
 * Selects specific fields from an array of objects
 * @param objects Array of objects to select fields from
 * @param selectedFields Array of field names to include
 * @param options Optional configuration for filtering values
 * @returns Array of new objects containing only the selected fields
 */
export const selectFieldsFromArray = <T extends Record<string, any>>(
  objects: T[],
  selectedFields: string[],
  options: SelectFieldsOptions = {}
): Partial<T>[] => {
  return objects.map(obj => selectFields(obj, selectedFields, options));
};

/**
 * Gets the total number of fields that would be included after selection
 * Useful for logging and debugging
 * @param obj The source object
 * @param selectedFields Array of field names to include
 * @param options Optional configuration for filtering values
 * @returns Number of fields that would be included
 */
export const getSelectedFieldCount = <T extends Record<string, any>>(
  obj: T,
  selectedFields: string[],
  options: SelectFieldsOptions = {}
): number => {
  const selected = selectFields(obj, selectedFields, options);
  return Object.keys(selected).length;
};


