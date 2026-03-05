import React from "react";
import { Download, CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const payments = [
  { id: "INV-2231", unit: "Palm Residency - A-201", period: "Mar 2026", amount: "Rs. 45,000", method: "Bank", status: "Paid" },
  { id: "INV-2232", unit: "City Nest - B-112", period: "Mar 2026", amount: "Rs. 40,000", method: "Card", status: "Pending" },
  { id: "INV-2233", unit: "Lake View Annex - C-302", period: "Mar 2026", amount: "Rs. 38,500", method: "Cash", status: "Paid" },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">My Collections</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 mt-2">Payments</h1>
            </div>
            <Button className="rounded-xl font-bold w-fit">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border border-emerald-200 bg-emerald-50 shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-widest font-black text-emerald-700">Collected</p>
                <h3 className="text-2xl font-black text-emerald-900 mt-1">Rs. 540,000</h3>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-amber-200 bg-amber-50 shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-widest font-black text-amber-700">Pending</p>
                <h3 className="text-2xl font-black text-amber-900 mt-1">Rs. 125,000</h3>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-rose-200 bg-rose-50 shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-widest font-black text-rose-700">Overdue</p>
                <h3 className="text-2xl font-black text-rose-900 mt-1">Rs. 24,000</h3>
              </CardContent>
            </Card>
          </section>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Property Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-black text-slate-900">{item.unit}</p>
                      <p className="text-xs uppercase tracking-wider font-black text-slate-400 mt-1">
                        {item.id} - {item.period}
                      </p>
                      <p className="text-sm text-slate-600 font-medium mt-2">{item.method}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-black text-slate-900">{item.amount}</p>
                      <Badge
                        className={
                          item.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }
                      >
                        {item.status === "Paid" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock3 className="w-3 h-3 mr-1" />
                        )}
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Detailed account-level payment history is available in the admin console.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
