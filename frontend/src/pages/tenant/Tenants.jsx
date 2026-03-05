import React from "react";
import { Link } from "react-router-dom";
import { Home, Wrench, AlertTriangle, Clock3 } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tenantOps = [
  { property: "Palm Residency", occupied: "18/20", newRequests: 2, maintenance: 3, due: 1 },
  { property: "City Nest", occupied: "15/15", newRequests: 0, maintenance: 2, due: 2 },
  { property: "Lake View Annex", occupied: "10/12", newRequests: 1, maintenance: 1, due: 0 },
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
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Resident Operations</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 mt-2">Tenant Operations</h1>
            </div>
            <Link to="/tenants/add" className="no-underline">
              <Button className="rounded-xl font-bold">Add Tenant</Button>
            </Link>
          </div>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Property-Level Tenant Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantOps.map((item) => (
                <div key={item.property} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-slate-500" />
                        <h3 className="text-lg font-black text-slate-900">{item.property}</h3>
                        <Badge className="bg-slate-100 text-slate-700 border border-slate-200">Occupied {item.occupied}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                        <span className="inline-flex items-center gap-1"><Clock3 className="w-4 h-4" /> {item.newRequests} new requests</span>
                        <span className="inline-flex items-center gap-1"><Wrench className="w-4 h-4" /> {item.maintenance} maintenance cases</span>
                        <span className="inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> {item.due} overdue payments</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl">Manage Property Queue</Button>
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Detailed tenant identities and global tenant records are managed from the admin console.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
