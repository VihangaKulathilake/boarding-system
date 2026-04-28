import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Loader } from "lucide-react";
import { searchLocations } from '@/api/locations';
import { determineLocationType, transformLocationResult } from "@/utils/locationUtils";


export default function LocationSearch({ onLocationSelect }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimer = useRef(null);

    // Handle user input with debounce
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Only search if query has at least 2 characters
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Wait 500ms before making API call
        debounceTimer.current = setTimeout(() => {
            fetchLocations(query);
        }, 500);
    };

    // Fetch locations from API
    const fetchLocations = async (query) => {
        try {
            setLoading(true);
            const data = await searchLocations(query);
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching locations:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle location selection
    const handleSelectLocation = (result) => {
        const location = transformLocationResult(result);
        onLocationSelect(location);

        // Clear search
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full">
            {/* Input Field */}
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                    type="text"
                    placeholder="Search cities or specific places..."
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                    className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-indigo-500/20 pl-10"
                />
                {loading && (
                    <Loader className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
                )}
            </div>

            {/* Dropdown Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                    {suggestions.map((result, idx) => {
                        const locationType = determineLocationType(result);
                        return (
                            <div
                                key={idx}
                                onClick={() => handleSelectLocation(result)}
                                className="p-3 hover:bg-slate-50 cursor-pointer border-b last:border-b-0 transition-colors"
                            >
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 text-indigo-500 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-900 truncate">
                                            {result.display_name}
                                        </div>
                                        <span className="text-xs text-slate-500 font-semibold uppercase">
                                            {locationType}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* No Results Message */}
            {showSuggestions && suggestions.length === 0 && !loading && searchQuery.length >= 2 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-3 text-center text-sm text-slate-500">
                    No locations found
                </div>
            )}
        </div>
    );
}
