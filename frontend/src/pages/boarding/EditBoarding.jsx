import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const boardingData = {
  b001: {
    name: "Palm Residency",
    location: "Nugegoda",
    totalRooms: 18,
    monthlyRent: 45000,
    description: "Modern boarding with furnished rooms and high-speed internet.",
  },
};

export default function EditBoarding() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = useMemo(
    () =>
      boardingData[id] || {
        name: "",
        location: "",
        totalRooms: "",
        monthlyRent: "",
        description: "",
      },
    [id]
  );

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/boardings");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="max-w-3xl border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Edit Boarding</CardTitle>
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">ID: {id}</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      min="1"
                      value={formData.totalRooms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRent">Monthly Rent (LKR)</Label>
                    <Input
                      id="monthlyRent"
                      name="monthlyRent"
                      type="number"
                      min="0"
                      value={formData.monthlyRent}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" className="rounded-xl px-6 font-bold">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/boardings")} className="rounded-xl">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
