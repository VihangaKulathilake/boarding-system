import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input id="totalRooms" name="totalRooms" type="number" min="1" value={form.totalRooms} onChange={onChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Monthly Rent / Base Price (LKR)</Label>
                    <Input id="price" name="price" type="number" min="0" value={form.price} onChange={onChange} required={form.type === 'full_property'} />
                  </div>
                </div>
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
