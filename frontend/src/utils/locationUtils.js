// Helper to determine location type
export const determineLocationType = (result) => {
    if (
        result.class === "boundary" ||
        result.type === "city" ||
        result.type === "town" ||
        result.type === "village" ||
        result.class === "place"
    ) {
        return "city";
    }
    return "place";
};

// Transform API result to your data format
export const transformLocationResult = (result) => {
    return {
        name: result.display_name,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        locationType: determineLocationType(result)
    };
};