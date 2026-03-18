import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Fix for default marker icon in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

// Component to fly to a new location
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

const MapPicker = ({ initialPosition, onLocationSelect }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // Default center: Sri Lanka (Colombo)
  const defaultCenter = [6.9271, 79.8612];

  useEffect(() => {
    if (position) {
      const lat = position.lat || position[0];
      const lng = position.lng || position[1];
      
      // Notify parent
      onLocationSelect({ lat, lng });
    }
  }, [position, onLocationSelect]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newPos);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search location. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search for an address (e.g. Colombo, Sri Lanka)"
            className="pl-10 h-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
        </div>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleSearch} 
          disabled={searching}
          className="rounded-xl font-bold px-4"
        >
          {searching ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="h-[400px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm relative z-0">
        <MapContainer
          center={position || defaultCenter}
          zoom={position ? 15 : 7}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
          {position && <ChangeView center={position} />}
        </MapContainer>
        
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <MapPin className="w-3 h-3 text-red-500" />
          {position 
            ? `LAT: ${Number(position.lat || position[0]).toFixed(4)} | LNG: ${Number(position.lng || position[1]).toFixed(4)}`
            : "Click on map to pick location"
          }
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 italic">
        * You can either search for an address above or click directly on the map to pin the exact location.
      </p>
    </div>
  );
};

export default MapPicker;
