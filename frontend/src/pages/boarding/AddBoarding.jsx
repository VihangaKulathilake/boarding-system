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
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSelectChange = (val) => setForm(p => ({ ...p, type: val }));
  const onImageUpload = (imageUrls) => setForm(p => ({ ...p, images: imageUrls }));
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
      await createBoarding(submitData);
      navigate("/boardings");
    } catch (error) {
      console.error(error);
      alert("Failed to create boarding");
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
          <Card className="max-w-3xl rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Add Boarding</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="boardingName">Boarding Name</Label>
                  <Input id="boardingName" name="boardingName" value={form.boardingName} onChange={onChange} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address / Location</Label>
                    <Input id="address" name="address" value={form.address} onChange={onChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={form.city} onChange={onChange} required />
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <Label>Pin Asset Location</Label>
                  <MapPicker onLocationSelect={onLocationSelect} />
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
                <div className="space-y-2">
                  <Label>Boarding Images</Label>
                  <ImageUpload onUploadComplete={onImageUpload} />
                </div>
                 <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={loading} className="rounded-xl font-bold">
                    {loading ? "Saving..." : "Save Boarding"}
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
