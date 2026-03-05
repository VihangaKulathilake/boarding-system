import React from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Wallet, AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  { label: "My Boardings", value: "3", sub: "Landlord portfolio", icon: Building2 },
  { label: "Occupied Rooms", value: "43", sub: "Across your properties", icon: Users },
  { label: "Revenue", value: "Rs. 540,000", sub: "This month", icon: Wallet },
  { label: "Open Issues", value: "7", sub: "Operations queue", icon: AlertTriangle },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Landlord Center</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 mt-2">Dashboard</h1>
              <p className="text-slate-500 font-medium mt-2">Manage only your own boarding operations and revenue.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/boardings/add" className="no-underline">
                <Button className="rounded-xl font-bold">Add Boarding</Button>
              </Link>
              <Link to="/tenants/add" className="no-underline">
                <Button variant="outline" className="rounded-xl font-bold">Add Tenant</Button>
              </Link>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((item) => (
              <Card key={item.label} className="rounded-2xl border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-slate-400">{item.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 mt-2">{item.value}</h3>
                      <p className="text-sm font-medium text-slate-500 mt-1">{item.sub}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <Card className="xl:col-span-2 rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-black tracking-tight">Occupancy Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { name: "Palm Residency", value: 95 },
                  { name: "Lakeview Annex", value: 88 },
                  { name: "Metro Lodge", value: 91 },
                ].map((property) => (
                  <div key={property.name}>
                    <div className="flex items-center justify-between mb-2 text-sm font-bold">
                      <span className="text-slate-700">{property.name}</span>
                      <span className="text-slate-900">{property.value}%</span>
                    </div>
                    <Progress value={property.value} className="h-2.5" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-black tracking-tight">Today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "2 new tenant requests",
                  "1 overdue payment reminder",
                  "4 maintenance tickets open",
                ].map((note) => (
                  <div key={note} className="rounded-xl border border-slate-100 p-3 bg-white">
                    <p className="text-sm font-semibold text-slate-700">{note}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-black tracking-tight">Recent Payments</CardTitle>
                <Link to="/payments" className="no-underline">
                  <Button variant="ghost" className="font-bold">
                    See All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Palm Residency · Room A-201", amount: "Rs. 45,000", status: "Paid" },
                  { name: "City Nest · Room B-112", amount: "Rs. 40,000", status: "Pending" },
                  { name: "Lake View Annex · Room C-302", amount: "Rs. 38,500", status: "Paid" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                    <p className="font-black text-slate-900">{item.name}</p>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-slate-800">{item.amount}</p>
                      <Badge className={item.status === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}>
                        {item.status === "Paid" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
