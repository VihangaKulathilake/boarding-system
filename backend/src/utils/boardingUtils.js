// Calculate available rooms of room based a boarding
export const calculateAvailableRooms = (boarding) => {
    if (boarding.type === "full_property") {
        return boarding.totalRooms;
    }
    if (boarding.type === "room_based") {
        const noOfRooms = boarding.rooms.length;
        const noOfBookedRooms = boarding.rooms.filter(room => room.available === false).length;
        return noOfRooms - noOfBookedRooms;
    }
}

// Calculate score of a boarding based on user preferences
export const calculateScore = (boarding, preferences) => {
    let score = 0;
    if (!preferences) return 0;

    // Type Match (High Priority)
    if (preferences.preferredType && preferences.preferredType !== "any") {
        if (boarding.type === preferences.preferredType) {
            score += 5;
        }
    }

    // City Match (Highest Priority)
    if (preferences.preferredLocations.type === "city" && preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        const cityMatch = preferences.preferredLocations.some(loc => 
            boarding.city?.toLowerCase().includes(loc.name.toLowerCase()) ||
            boarding.address?.toLowerCase().includes(loc.name.toLowerCase())
        );
        if (cityMatch) score += 10;
    }

    // Handle preferredLocations with locationType
    if (preferences.preferredLocations.type === "pla" && preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        // City location match
        const cityLocations = preferences.preferredLocations.filter(loc => loc.locationType === "city");
        if (cityLocations.length > 0) {
            const cityMatch = cityLocations.some(loc => 
            boarding.city?.toLowerCase().includes(loc.name.toLowerCase())
            );
            if (cityMatch) score += 10;
        }

        // Place location match (via distance from $geoNear)
        const placeLocations = preferences.preferredLocations.filter(loc => loc.locationType === "place");
            if (placeLocations.length > 0 && boarding.distance !== null && boarding.distance !== undefined) {
                score += 8; // Bonus for being near preferred place
                // Bonus for being very close (within 2km)
                if (boarding.distance <= 2) {
                score += 5;
                }
            }
        }

    // Price Match
    if (preferences.maxPrice && boarding.price) {
        if (boarding.price <= preferences.maxPrice) {
            score += 5;
            // Bonus for being well within budget
            if (boarding.price <= preferences.maxPrice * 0.8) {
                score += 2;
            }
        }
    }

    // Facilities Match
    if (preferences.requiredFacilities && preferences.requiredFacilities.length > 0 && boarding.facilities) {
        const matchCount = preferences.requiredFacilities.filter(f => 
            boarding.facilities.includes(f)
        ).length;
        score += (matchCount * 2);
    }

    // Rating Bonus
    if (boarding.rating) {
        score += (boarding.rating * 1);
    }

    // Distance Bonus
    if (boarding.distance !== null && boarding.distance !== undefined) {
        // Closer distances = higher score
        // Formula: max 3 points for being within 1km, decreasing as distance increases
        if (boarding.distance <= 1) {
            score += 3;
        } else if (boarding.distance <= 5) {
            score += 2;
        } else if (boarding.distance <= 10) {
            score += 1;
        }
    }

    return score;
    
}

