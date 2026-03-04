import React from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, BedDouble, Users, Pencil, Eye } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const boardings = [
  { id: "b001", name: "Palm Residency", location: "Nugegoda", rooms: 18, occupied: 16, status: "Active" },
  { id: "b002", name: "Lake View Annex", location: "Kandy", rooms: 12, occupied: 9, status: "Active" },
  { id: "b003", name: "City Nest", location: "Colombo 06", rooms: 24, occupied: 24, status: "Full" },
];

export default function Boardings() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Portfolio</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Boarding Properties</h1>
            </div>
            <Link to="/boardings/add" className="no-underline">
              <Button className="h-11 rounded-xl font-bold">Add New Boarding</Button>
            </Link>
          </div>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">All Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {boardings.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-500" />
                        <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                        <Badge
                          className={
                            item.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {item.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BedDouble className="w-4 h-4" /> {item.rooms} rooms
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-4 h-4" /> {item.occupied}/{item.rooms} occupied
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Link to={`/boardings/edit/${item.id}`} className="no-underline">
                        <Button className="rounded-xl">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                    </div>
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
