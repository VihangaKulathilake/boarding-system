import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddTenant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomNo: "",
    nic: "",
    emergencyContact: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/tenants");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="max-w-4xl border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Add Tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomNo">Assigned Room</Label>
                    <Input id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nic">NIC / Passport</Label>
                    <Input id="nic" name="nic" value={formData.nic} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" className="rounded-xl px-6 font-bold">
                    Save Tenant
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate("/tenants")}>
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
