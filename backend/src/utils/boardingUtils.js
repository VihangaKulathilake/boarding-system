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

    // 1. Type Match (High Priority)
    if (preferences.preferredType && preferences.preferredType !== "any") {
        if (boarding.type === preferences.preferredType) {
            score += 5;
        }
    }

    // 2. City Match (Highest Priority)
    if (preferences.preferredCities && preferences.preferredCities.length > 0) {
        const cityMatch = preferences.preferredCities.some(city => 
            boarding.city?.toLowerCase().includes(city.toLowerCase()) ||
            boarding.address?.toLowerCase().includes(city.toLowerCase())
        );
        if (cityMatch) score += 10;
    }

    // 3. Price Match
    if (preferences.maxPrice && boarding.price) {
        if (boarding.price <= preferences.maxPrice) {
            score += 5;
            // Bonus for being well within budget
            if (boarding.price <= preferences.maxPrice * 0.8) {
                score += 2;
            }
        }
    }

    // 4. Facilities Match
    if (preferences.requiredFacilities && preferences.requiredFacilities.length > 0 && boarding.facilities) {
        const matchCount = preferences.requiredFacilities.filter(f => 
            boarding.facilities.includes(f)
        ).length;
        score += (matchCount * 2);
    }

    // 5. Rating Bonus
    if (boarding.rating) {
        score += (boarding.rating * 1);
    }

    return score;
};