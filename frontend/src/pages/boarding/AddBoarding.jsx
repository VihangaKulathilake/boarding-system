import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createBoarding } from "@/api/boardings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/common/ImageUpload";
import MapPicker from "@/components/common/MapPicker";
import {
  Wifi,
  Wind,
  Car,
  Shield,
  Coffee,
  Check,
  BookOpen,
  Bath,
  Shirt,
  Droplets,
  DoorOpen,
  Bus,
  VolumeX,
  Plus,
  Trash2,
  MapPin
} from "lucide-react";

const PROPERTY_FACILITIES = [
  { name: "Parking Space", icon: Car },
  { name: "CCTV / Security", icon: Shield },
  { name: "Filtered Water", icon: Droplets },
  { name: "Laundry / Shared Ironing", icon: Shirt },
  { name: "Near Bus Route", icon: Bus },
  { name: "Quiet Environment", icon: VolumeX },
];

const ROOM_FACILITIES = [
  { name: "Air Conditioning", icon: Wind },
  { name: "Free WiFi", icon: Wifi },
  { name: "Attached Bathroom", icon: Bath },
  { name: "Private Kitchen", icon: Coffee },
  { name: "Study Desks", icon: BookOpen },
  { name: "Separate Entrance", icon: DoorOpen },
];

const AVAILABLE_FACILITIES = [...PROPERTY_FACILITIES, ...ROOM_FACILITIES];

export default function AddBoarding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    boardingName: "",
    address: "",
    city: "",
    type: "room_based",
    totalRooms: "",
    price: "",
    description: "",
    images: [],
    latitude: "",
    longitude: "",
    facilities: [],
    rooms: [{ roomNumber: "", description: "", price: "", capacity: "", images: [], facilities: [] }], // Initial room for room_based
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSelectChange = (val) => setForm(p => ({ ...p, type: val }));
  const onImageUpload = (imageUrls) => setForm(p => ({ ...p, images: imageUrls }));
  const onLocationSelect = React.useCallback(({ lat, lng }) => setForm(p => ({ ...p, latitude: lat, longitude: lng })), []);

  const addRoom = () => {
    setForm(p => ({
      ...p,
      rooms: [...p.rooms, { roomNumber: "", description: "", price: "", capacity: "", images: [], facilities: [] }]
    }));
  };

  const removeRoom = (index) => {
    setForm(p => ({
      ...p,
      rooms: p.rooms.filter((_, i) => i !== index)
    }));
  };

  const onRoomChange = (index, field, value) => {
    setForm(p => {
      const newRooms = [...p.rooms];
      newRooms[index] = { ...newRooms[index], [field]: value };
      return { ...p, rooms: newRooms };
    });
  };

  const toggleFacility = (facilityName) => {
    setForm(p => {
      const exists = p.facilities.includes(facilityName);
      if (exists) {
        return { ...p, facilities: p.facilities.filter(f => f !== facilityName) };
      }
      return { ...p, facilities: [...p.facilities, facilityName] };
    });
  };

  const toggleRoomFacility = (index, facilityName) => {
    setForm(p => {
      const newRooms = [...p.rooms];
      const room = newRooms[index];
      const facilities = room.facilities || [];
      const exists = facilities.includes(facilityName);
      
      if (exists) {
        newRooms[index] = { ...room, facilities: facilities.filter(f => f !== facilityName) };
      } else {
        newRooms[index] = { ...room, facilities: [...facilities, facilityName] };
      }
      
      return { ...p, rooms: newRooms };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = {
        ...form,
        location: {
          type: "Point",
          coordinates: [Number(form.longitude), Number(form.latitude)],
        },
      };

      if (form.type === "room_based") {
        delete submitData.price;
        delete submitData.totalRooms;
      } else {
        delete submitData.rooms;
      }

      await createBoarding(submitData);
      navigate("/boardings");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create boarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="max-w-4xl rounded-[2rem] border-0 shadow-xl shadow-slate-200/50 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-black tracking-tight text-slate-900">Add <span className="text-indigo-600">Boarding</span></CardTitle>
              <p className="text-slate-500 font-medium">Register a new property to the platform ecosystem.</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={onSubmit}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="boardingName" className="font-bold text-slate-700">Boarding Name</Label>
                    <Input id="boardingName" name="boardingName" className="h-12 rounded-xl" value={form.boardingName} onChange={onChange} required placeholder="e.g. Sunset Residency" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="address" className="font-bold text-slate-700">Address / Location</Label>
                      <Input id="address" name="address" className="h-12 rounded-xl" value={form.address} onChange={onChange} required placeholder="123, Main Street" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="city" className="font-bold text-slate-700">City</Label>
                      <Input id="city" name="city" className="h-12 rounded-xl" value={form.city} onChange={onChange} required placeholder="Colombo" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <Label className="font-bold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" /> Pin Asset Location
                  </Label>
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <MapPicker onLocationSelect={onLocationSelect} />
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-slate-50">
                  <div className="space-y-3">
                    <Label htmlFor="type" className="font-bold text-slate-700">Listing Type</Label>
                    <Select value={form.type} onValueChange={onSelectChange}>
                      <SelectTrigger className="h-12 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl font-sans">
                        <SelectItem value="room_based">Room Based (Individual Rents)</SelectItem>
                        <SelectItem value="full_property">Full Property (Single Unit)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {form.type === 'full_property' ? (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-3">
                        <Label htmlFor="totalRooms" className="font-bold text-slate-700">Total Rooms</Label>
                        <Input id="totalRooms" name="totalRooms" type="number" min="1" className="h-12 rounded-xl" value={form.totalRooms} onChange={onChange} required />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="price" className="font-bold text-slate-700">Monthly Rent (LKR)</Label>
                        <Input id="price" name="price" type="number" min="0" className="h-12 rounded-xl" value={form.price} onChange={onChange} required />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="flex items-center justify-between">
                        <Label className="font-black text-xs uppercase tracking-widest text-indigo-600">Room Inventory Matrix</Label>
                        <Button type="button" onClick={addRoom} variant="outline" className="h-10 px-4 rounded-xl font-bold bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50 flex items-center gap-2 shadow-sm">
                          <Plus className="w-4 h-4" /> Add Room
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {form.rooms.map((room, index) => (
                          <div key={index} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm relative group space-y-6">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                                   {index + 1}
                                 </div>
                                 <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Room Specification</h4>
                               </div>
                               {form.rooms.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => removeRoom(index)}
                                  variant="ghost"
                                  className="h-10 w-10 p-0 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                               )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400">Room No.</Label>
                                <Input
                                  type="string"
                                  placeholder="001"
                                  className="h-12 rounded-xl"
                                  value={room.roomNumber}
                                  onChange={(e) => onRoomChange(index, 'roomNumber', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400">Monthly Price (LKR)</Label>
                                <Input
                                  type="number"
                                  placeholder="15000"
                                  className="h-12 rounded-xl"
                                  value={room.price}
                                  onChange={(e) => onRoomChange(index, 'price', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400">Capacity</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="1"
                                  className="h-12 rounded-xl"
                                  value={room.capacity}
                                  onChange={(e) => onRoomChange(index, 'capacity', e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase text-slate-400">Room Description</Label>
                              <Textarea
                                placeholder="E.g., Master bedroom with attached bathroom and private balcony..."
                                className="min-h-[100px] rounded-xl resize-none"
                                value={room.description}
                                onChange={(e) => onRoomChange(index, 'description', e.target.value)}
                              />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50">
                               <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Individual Room Photos</Label>
                               <ImageUpload 
                                  maxImages={3} 
                                  onUploadComplete={(urls) => onRoomChange(index, 'images', urls)} 
                               />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Room-Specific Facilities</Label>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                {ROOM_FACILITIES.map((facility) => {
                                  const Icon = facility.icon;
                                  const isSelected = (room.facilities || []).includes(facility.name);
                                  return (
                                    <div
                                      key={facility.name}
                                      onClick={() => toggleRoomFacility(index, facility.name)}
                                      className={`flex items-center gap-2 p-2.5 rounded-xl border border-dashed cursor-pointer transition-all active:scale-95 ${isSelected
                                        ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                                        : 'bg-slate-50/50 border-slate-200 text-slate-400 hover:border-indigo-200 hover:bg-slate-50'
                                        }`}
                                    >
                                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                                      <span className="text-[11px] font-bold flex-1">{facility.name}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <Label htmlFor="description" className="font-bold text-slate-700">Detailed Description</Label>
                  <Textarea id="description" name="description" rows={5} className="rounded-2xl resize-none" value={form.description} onChange={onChange} placeholder="Describe the atmosphere, specific rules, and property vibes..." />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {form.type === 'full_property' ? 'Facilities & Amenities' : 'Property-Level Facilities & Shared Amenities'}
                  </Label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {(form.type === 'full_property' ? AVAILABLE_FACILITIES : PROPERTY_FACILITIES).map((facility) => {
                      const Icon = facility.icon;
                      const isSelected = form.facilities.includes(facility.name);
                      return (
                        <div
                          key={facility.name}
                          onClick={() => toggleFacility(facility.name)}
                          className={`flex items-center gap-2.5 p-3 rounded-[1rem] border-2 cursor-pointer transition-all active:scale-95 ${isSelected
                            ? 'bg-indigo-50/50 border-indigo-500 text-indigo-700 shadow-[0_4px_14px_rgba(99,102,241,0.15)]'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100 hover:bg-slate-50 shadow-sm'
                            }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <span className="text-sm font-bold flex-1">{facility.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <Label className="font-bold text-slate-700">Property Imagery</Label>
                  <div className="rounded-2xl border-2 border-dashed border-slate-100 p-8 shadow-inner bg-slate-50/30">
                    <ImageUpload onUploadComplete={onImageUpload} />
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-slate-100">
                  <Button type="submit" disabled={loading} className="h-14 px-10 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3">
                    {loading ? "Initializing..." : <>Register Boarding <Plus className="w-5 h-5" /></>}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => navigate("/boardings")} className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-900">Discard Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
