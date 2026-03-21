import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin } from "lucide-react";
import { getBoardingById, updateBoarding } from "@/api/boardings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MapPicker from "@/components/common/MapPicker";

export default function EditBoarding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [form, setForm] = useState({
    boardingName: "",
    address: "",
    city: "",
    type: "room_based",
    totalRooms: "",
    price: "",
    description: "",
    latitude: "",
    longitude: "",
    rooms: [], // Existing rooms for room_based
  });

  React.useEffect(() => {
    fetchBoarding();
  }, [id]);

  const fetchBoarding = async () => {
    try {
      setFetchLoading(true);
      const data = await getBoardingById(id);
      setForm({
        boardingName: data.boardingName,
        address: data.address,
        city: data.city || "",
        type: data.type,
        totalRooms: data.totalRooms?.toString(),
        price: data.price?.toString(),
        description: data.description,
        latitude: data.location?.coordinates[1]?.toString() || "",
        longitude: data.location?.coordinates[0]?.toString() || "",
        rooms: data.rooms || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSelectChange = (val) => setForm(p => ({ ...p, type: val }));
  const onLocationSelect = React.useCallback(({ lat, lng }) => setForm(p => ({ ...p, latitude: lat, longitude: lng })), []);
  
  const addRoom = () => {
    setForm(p => ({
      ...p,
      rooms: [...(p.rooms || []), { roomNumber: "", description: "", price: "", capacity: 1, images: [] }]
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
      await updateBoarding(id, submitData);
      navigate("/boardings");
    } catch (error) {
      console.error(error);
      alert("Failed to update boarding");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="p-12 text-center text-slate-400 font-black">Loading property details for audit...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="max-w-3xl rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Edit Boarding</CardTitle>
              <p className="text-xs uppercase tracking-wider font-black text-slate-400">Property ID: {id}</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="boardingName">Boarding Name</Label>
                  <Input id="boardingName" name="boardingName" value={form.boardingName} onChange={onChange} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={form.address} onChange={onChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={form.city} onChange={onChange} required />
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <Label>Asset Location</Label>
                  {form.latitude && form.longitude && (
                    <MapPicker 
                      initialPosition={{ lat: Number(form.latitude), lng: Number(form.longitude) }} 
                      onLocationSelect={onLocationSelect} 
                    />
                  )}
                  {!form.latitude && !form.longitude && (
                    <MapPicker onLocationSelect={onLocationSelect} />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Listing Type</Label>
                  <Select value={form.type} onValueChange={onSelectChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
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
                        {form.rooms?.map((room, index) => (
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
                                  placeholder="101"
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
                                  initialImages={room.images || []}
                                  onUploadComplete={(urls) => onRoomChange(index, 'images', urls)} 
                               />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" rows={5} value={form.description} onChange={onChange} />
                </div>
                 <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={loading} className="rounded-xl font-bold">
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/boardings")} className="rounded-xl">Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
