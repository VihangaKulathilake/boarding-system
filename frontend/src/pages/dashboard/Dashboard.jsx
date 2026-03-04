import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Wallet,
  TriangleAlert,
  ArrowUpRight,
  Clock3,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Active Boardings", value: "28", sub: "+3 this month", icon: Building2 },
  { label: "Current Tenants", value: "114", sub: "92% occupancy", icon: Users },
  { label: "Monthly Revenue", value: "Rs. 1.9M", sub: "+12.4%", icon: Wallet },
  { label: "Pending Issues", value: "6", sub: "Needs attention", icon: TriangleAlert },
];

const recentPayments = [
  { id: "PAY-9832", tenant: "Nimesh Perera", amount: "Rs. 45,000", status: "Paid" },
  { id: "PAY-9826", tenant: "Kasuni Silva", amount: "Rs. 38,000", status: "Pending" },
  { id: "PAY-9817", tenant: "Yohan Madush", amount: "Rs. 41,500", status: "Paid" },
];

const tasks = [
  { title: "Review 2 new boarding applications", due: "Today", icon: Clock3 },
  { title: "Approve monthly payment reconciliation", due: "Tomorrow", icon: CreditCard },
  { title: "Resolve water leak complaint - Block C", due: "High Priority", icon: TriangleAlert },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 space-y-8">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400">Landlord Console</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Operations Dashboard</h1>
              <p className="text-slate-500 font-medium mt-2">Monitor occupancy, cash flow, and issues in one place.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/boardings/add" className="no-underline">
                <Button className="rounded-xl h-11 px-5 font-bold">Add Boarding</Button>
              </Link>
              <Link to="/tenants/add" className="no-underline">
                <Button variant="outline" className="rounded-xl h-11 px-5 font-bold">
                  Add Tenant
                </Button>
              </Link>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item) => (
              <Card key={item.label} className="border-0 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-slate-400">{item.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 mt-2">{item.value}</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">{item.sub}</p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2 border-0 shadow-sm rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-black tracking-tight">Occupancy Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600">Overall Occupancy</span>
                    <span className="text-slate-900">92%</span>
                  </div>
                  <Progress value={92} className="h-2.5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Block A", value: 96 },
                    { name: "Block B", value: 88 },
                    { name: "Block C", value: 91 },
                  ].map((block) => (
                    <div key={block.name} className="rounded-xl border border-slate-100 p-4 bg-white">
                      <p className="text-sm font-bold text-slate-700">{block.name}</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">{block.value}%</p>
                      <Progress value={block.value} className="h-2 mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-black tracking-tight">Priority Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.title} className="rounded-xl border border-slate-100 p-4 bg-white">
                    <div className="flex items-start gap-3">
                      <task.icon className="w-4 h-4 text-slate-500 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{task.title}</p>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-black mt-1">{task.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-black tracking-tight">Recent Payments</CardTitle>
                <Link to="/payments" className="no-underline">
                  <Button variant="ghost" className="font-bold">
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"
                  >
                    <div>
                      <p className="text-sm font-black text-slate-900">{payment.tenant}</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{payment.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black text-slate-900">{payment.amount}</p>
                      <Badge
                        className={
                          payment.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }
                      >
                        {payment.status === "Paid" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {payment.status}
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
