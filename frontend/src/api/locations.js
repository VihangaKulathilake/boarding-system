// What is openstreetmap? Is it a library ?
// It is not a libarary,
// rather than OpenStreetMap (OSM) is a collaborative project that creates a free editable map of the world.
// It is built by a community of mappers who contribute and maintain data about roads, trails, cafés, railway stations, and much more, all over the globe.
// The data from OpenStreetMap can be used in various applications, including navigation, geocoding, and location-based services.
// In this code snippet, we are using the Nominatim API, which is a search engine for OpenStreetMap data, to search for locations based on user input in a location search component.

// What is nominatim api?
// Nominatim is a search engine for OpenStreetMap data.
// It allows you to search for places and addresses using a query string,
// and it returns structured data about the location, including its name, type, coordinates, and more.
// The API is commonly used for geocoding (converting addresses to coordinates) and reverse geocoding (converting coordinates to addresses).
// In this code snippet, we are using the Nominatim API to search for locations based on user input in a location search component.

// API function to search locations using Nominatim
export const searchLocations = async (query) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`
        );
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching locations:", error);
        throw error;
    }
};