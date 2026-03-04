import React from "react";
import { Download, Filter, CheckCircle2, Clock3 } from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const payments = [
  { id: "INV-2241", tenant: "Nimesh Perera", period: "Mar 2026", amount: "Rs. 45,000", method: "Bank Transfer", status: "Paid" },
  { id: "INV-2237", tenant: "Kasuni Silva", period: "Mar 2026", amount: "Rs. 38,000", method: "Card", status: "Pending" },
  { id: "INV-2231", tenant: "Yohan Madush", period: "Mar 2026", amount: "Rs. 41,500", method: "Cash", status: "Paid" },
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
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Finance</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Payments & Invoices</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Collected", value: "Rs. 1,204,500", tone: "text-emerald-700 bg-emerald-50 border-emerald-200" },
              { label: "Pending", value: "Rs. 138,000", tone: "text-amber-700 bg-amber-50 border-amber-200" },
              { label: "Overdue", value: "Rs. 46,500", tone: "text-rose-700 bg-rose-50 border-rose-200" },
            ].map((item) => (
              <Card key={item.label} className={`border ${item.tone} rounded-2xl shadow-none`}>
                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-widest font-black">{item.label}</p>
                  <h3 className="text-2xl font-black mt-1">{item.value}</h3>
                </CardContent>
              </Card>
            ))}
          </section>

          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-5 bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-black text-slate-900">{item.tenant}</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{item.id}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-medium mt-2">
                        <span>{item.period}</span>
                        <span>{item.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-black text-slate-900">{item.amount}</p>
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
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
