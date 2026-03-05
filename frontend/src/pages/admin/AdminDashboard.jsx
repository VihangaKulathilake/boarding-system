import React from "react";
import { Link } from "react-router-dom";
import { Users, Building2, BadgeCheck, AlertTriangle, ArrowUpRight, ShieldCheck } from "lucide-react";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "2,184", icon: Users, tone: "text-blue-600 bg-blue-50" },
  { label: "Landlords", value: "186", icon: Building2, tone: "text-violet-600 bg-violet-50" },
  { label: "Verified Boardings", value: "742", icon: BadgeCheck, tone: "text-emerald-600 bg-emerald-50" },
  { label: "Open Flags", value: "17", icon: AlertTriangle, tone: "text-rose-600 bg-rose-50" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Platform Owner</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Admin Overview</h1>
              <p className="text-slate-500 font-medium mt-2">Monitor marketplace health, user growth, and risk signals.</p>
            </div>
            <Badge className="w-fit bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Secure Mode
            </Badge>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((item) => (
              <Card key={item.label} className="border-0 shadow-sm rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-slate-400">{item.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 mt-2">{item.value}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.tone}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-black tracking-tight">Recently Joined Landlords</CardTitle>
                <Link to="/admin/landlords" className="no-underline">
                  <Button variant="ghost" className="font-bold">
                    Open <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Rukshan Fernando", "Amaya Holdings", "Cityline Residencies"].map((name) => (
                  <div key={name} className="rounded-xl border border-slate-100 p-4 bg-white">
                    <p className="font-black text-slate-900">{name}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Pending verification</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black tracking-tight">Platform Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "3 properties reported for suspicious listings",
                  "Payment failure rate spiked to 2.8% in last 24h",
                  "12 tenant verification submissions pending review",
                ].map((alert) => (
                  <div key={alert} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-bold text-amber-900">{alert}</p>
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
