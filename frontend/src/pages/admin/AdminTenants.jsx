import React from "react";
import { BadgeCheck, UserRound, Mail, Phone, Ban } from "lucide-react";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tenants = [
  { id: "T-8001", name: "Vihanga Kulathilake", email: "vihanga@mail.com", phone: "+94 76 777 1234", verified: true },
  { id: "T-8002", name: "Dulani Senevirathne", email: "dulani@mail.com", phone: "+94 71 555 3221", verified: false },
  { id: "T-8003", name: "Kasun Wijesinghe", email: "kasun@mail.com", phone: "+94 77 888 4566", verified: true },
];

export default function AdminTenants() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black tracking-tight">Manage Tenants</CardTitle>
              <p className="text-slate-500 font-medium">Review tenant identities and enforce account policy.</p>
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
                            tenant.verified
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }
                        >
                          {tenant.verified ? <BadgeCheck className="w-3 h-3 mr-1" /> : <UserRound className="w-3 h-3 mr-1" />}
                          {tenant.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {tenant.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-4 h-4" /> {tenant.phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="rounded-xl">View</Button>
                      <Button variant="outline" className="rounded-xl text-rose-600 border-rose-200 hover:bg-rose-50">
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend
                      </Button>
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
