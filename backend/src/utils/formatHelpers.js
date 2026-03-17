// Normalize input that can be either a comma-separated string or an array into an array of trimmed strings
export const normalizeStringArray = (value) => {

    // Convert undefined or null to undefined to indicate no value
  if (value === undefined || value === null) return undefined;

    // If it's already an array, trim each item. If it's a string, split by comma and trim. Filter out empty strings in both cases.   
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean); 
  }

    // If it's a string, split by comma, trim each item, and filter out empty strings. If it's not a string or array, return undefined.
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
};