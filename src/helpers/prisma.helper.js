export function exclude(data, keys) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => exclude(item, keys));
  }

  const filteredData = {};
  for (const [key, value] of Object.entries(data)) {
    if (!keys.includes(key)) {
      if (value instanceof Date) { // Check if the value is a Date object
        filteredData[key] = value; // Retain the Date object
      } else if (typeof value === 'object' && value !== null) {
        filteredData[key] = exclude(value, keys);
      } else {
        filteredData[key] = value;
      }
    }
  }

  return filteredData;
}
