import React from "react";
import { CheckCircle2, Clock3, Building2, Mail, Phone } from "lucide-react";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const landlords = [
  { id: "L-001", name: "Rukshan Fernando", email: "rukshan@host.lk", phone: "+94 77 000 2211", properties: 4, status: "Verified" },
  { id: "L-002", name: "Amaya Holdings", email: "admin@amaya.lk", phone: "+94 11 245 8899", properties: 12, status: "Pending" },
  { id: "L-003", name: "Cityline Residencies", email: "ops@cityline.lk", phone: "+94 76 111 2991", properties: 7, status: "Verified" },
];

export default function AdminLandlords() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Manage Landlords</CardTitle>
              <p className="text-slate-500 font-medium">Review accounts, verify identities, and monitor property count.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {landlords.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                        <Badge
                          className={
                            item.status === "Verified"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }
                        >
                          {item.status === "Verified" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock3 className="w-3 h-3 mr-1" />
                          )}
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {item.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {item.phone}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-4 h-4" /> {item.properties} properties
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="rounded-xl">View</Button>
                      {item.status === "Pending" && <Button className="rounded-xl">Approve</Button>}
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
