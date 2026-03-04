import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Home, Plus, Eye } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tenants = [
  { id: "T-101", name: "Nimesh Perera", room: "A-204", phone: "+94 77 123 4567", email: "nimesh@mail.com", status: "Active" },
  { id: "T-102", name: "Kasuni Silva", room: "B-108", phone: "+94 71 987 2210", email: "kasuni@mail.com", status: "Pending" },
  { id: "T-103", name: "Yohan Madush", room: "C-301", phone: "+94 76 111 3322", email: "yohan@mail.com", status: "Active" },
];

export default function Tenants() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Residents</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Tenant Management</h1>
            </div>
            <Link to="/tenants/add" className="no-underline">
              <Button className="h-11 rounded-xl font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Add Tenant
              </Button>
            </Link>
          </div>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Current Tenants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenants.map((tenant) => (
                <div key={tenant.id} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900">{tenant.name}</h3>
                        <Badge
                          className={
                            tenant.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }
                        >
                          {tenant.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Home className="w-4 h-4" /> Room {tenant.room}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {tenant.phone}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {tenant.email}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
