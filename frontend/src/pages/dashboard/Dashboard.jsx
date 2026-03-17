import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Wallet, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Calendar,
  MoreVertical,
  Activity
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const revenueData = [
  { name: "Jan", total: 400000 },
  { name: "Feb", total: 450000 },
  { name: "Mar", total: 420000 },
  { name: "Apr", total: 500000 },
  { name: "May", total: 540000 },
  { name: "Jun", total: 580000 },
];

const occupancyData = [
  { name: "Occupied", value: 43 },
  { name: "Vacant", value: 7 },
];

const COLORS = ["#6366f1", "#e2e8f0"];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1 
    } 
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Activity className="w-3 h-3" />
                Live Landlord Insights
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900">
                Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Center</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-lg">
                Your end-to-end boarding operations dashboard. Manage properties, monitor cashflow, and support tenants in real-time.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/boardings/add" className="no-underline">
                <Button className="h-12 px-6 rounded-2xl font-black bg-indigo-600 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95 group">
                  New Boarding <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-200 bg-white grid place-items-center">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.section 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {[
              { label: "Properties", val: "03", sub: "Live Assets", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Occupancy", val: "86%", sub: "43 / 50 Rooms", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Revenue", val: "Rs. 540k", sub: "+12.5% vs Last Mo", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Support", val: "07", sub: "Pending Tasks", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="rounded-[2rem] border-0 shadow-lg shadow-slate-200/50 overflow-hidden bg-white hover:shadow-xl transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-slate-50 text-slate-400 border-none font-bold uppercase tracking-widest text-[10px]">
                        Last 30 Days
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{stat.label}</p>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
                      <p className="text-xs font-bold text-slate-500">{stat.sub}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="xl:col-span-2"
            >
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-white p-8 group">
                <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Revenue Trajectory</CardTitle>
                    <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Earnings across the last 6 months</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-bold">
                       <TrendingUp className="w-3 h-3 mr-1" /> High
                    </Badge>
                  </div>
                </CardHeader>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        tickFormatter={(value) => `Rs.${value/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800 }}
                        cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#6366f1" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorTotal)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-indigo-600 text-white p-8 h-full flex flex-col items-center justify-center text-center overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/20 transition-colors duration-700"></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">Portfolio Capacity</h3>
                  <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={occupancyData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={10}
                          dataKey="value"
                        >
                          <Cell stroke="none" fill="#ffffff" />
                          <Cell stroke="none" fill="rgba(255,255,255,0.2)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-4xl font-black">86%</span>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Full</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-indigo-100 font-medium">You have 7 rooms currently vacant across 3 properties.</p>
                    <Button className="w-full h-12 rounded-2xl bg-white text-indigo-600 hover:bg-slate-50 font-black shadow-lg">
                      View Vacancies
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                   <div>
                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Recent Payments</CardTitle>
                    <CardDescription className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mt-1">Transaction stream for this week</CardDescription>
                  </div>
                  <Link to="/payments">
                    <Button variant="ghost" className="rounded-xl font-black text-indigo-600 hover:bg-indigo-50">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {[
                      { name: "John Doe", property: "Sunset Residency · RM 201", amount: "Rs. 25,000", time: "2h ago", status: "Verified" },
                      { name: "Sarah Khan", property: "Metro Lodge · RM 105", amount: "Rs. 32,000", time: "5h ago", status: "Verified" },
                      { name: "Alex Wong", property: "Urban Annex · RM 302", amount: "Rs. 28,500", time: "Yesterday", status: "Pending" },
                    ].map((tx, i) => (
                      <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all cursor-default text-lg font-black text-slate-400">
                             {tx.name[0]}
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{tx.name}</p>
                            <p className="text-xs font-bold text-slate-400 tracking-tight">{tx.property}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">{tx.amount}</p>
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <span className="text-[10px] font-bold text-slate-400">{tx.time}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="rounded-[3rem] border-0 shadow-2xl shadow-indigo-100/30 bg-white p-10 flex flex-col justify-between group overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight">Active Capacity</h3>
                       <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <Building2 className="w-6 h-6" />
                       </div>
                    </div>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                       Optimize your portfolio. Check real-time occupancy rates and manage tenant leases effectively.
                    </p>
                    <div className="space-y-6 pt-4">
                       {[
                         { name: "Sunset Residency", val: 92 },
                         { name: "Metro Lodge", val: 84 },
                         { name: "Urban Annex", val: 78 }
                       ].map((p, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between items-end">
                               <span className="font-black text-slate-700 uppercase tracking-widest text-[10px]">{p.name}</span>
                               <span className="font-black text-indigo-600">{p.val}%</span>
                            </div>
                            <Progress value={p.val} className="h-3 bg-slate-50" indicatorClassName="bg-gradient-to-r from-indigo-500 to-indigo-600" />
                         </div>
                       ))}
                    </div>
                 </div>
                 <Button variant="ghost" className="w-full mt-10 h-14 rounded-2xl font-black text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all uppercase tracking-[0.2em] text-xs">
                    Expands Property Management <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
