import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Building2, 
  BadgeCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Zap,
  MoreVertical,
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line
} from "recharts";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/api/users";
import { getAdminStats } from "@/api/boardings";

const growthData = [
  { name: "Mon", users: 120, boardings: 45 },
  { name: "Tue", users: 150, boardings: 52 },
  { name: "Wed", users: 200, boardings: 61 },
  { name: "Thu", users: 180, boardings: 58 },
  { name: "Fri", users: 250, boardings: 80 },
  { name: "Sat", users: 310, boardings: 92 },
  { name: "Sun", users: 280, boardings: 85 },
];

const healthData = [
  { name: "Jan", health: 98 },
  { name: "Feb", health: 96 },
  { name: "Mar", health: 99 },
  { name: "Apr", health: 95 },
  { name: "May", health: 97 },
  { name: "Jun", health: 98 },
];

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

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({ landlords: 0, tenants: 0, revenue: 0, recentUsers: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [users, adminStats] = await Promise.all([
        getUsers(),
        getAdminStats(),
      ]);
      setStats({
        landlords: adminStats.landlords,
        tenants: adminStats.tenants,
        revenue: adminStats.revenue,
        recentUsers: users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-12 space-y-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-violet-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Globe className="w-3 h-3" />
                Global Platform Oversight
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 mt-2">
                Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 font-black">X</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-lg">
                Your unified platform control center. Monitor ecosystem health, mitigate risks, and scale operation parameters.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="h-10 px-4 bg-emerald-50 text-emerald-700 border-none font-black flex items-center gap-2 rounded-xl">
                 <ShieldCheck className="w-4 h-4" /> Secure Admin Mode
              </Badge>
              <Button variant="outline" className="h-12 w-12 rounded-[1.25rem] border-slate-200 bg-white grid place-items-center">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
          </motion.div>

          {/* Core Metrics */}
          <motion.section 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
          >
            {[
              { label: "Active Landlords", val: stats.landlords.toString().padStart(2, '0'), sub: "Verified Partners", icon: Wallet, tone: "text-orange-600 bg-orange-50", growth: "+14.2%" },
              { label: "Platform Residents", val: stats.tenants.toString().padStart(2, '0'), sub: "Active Users", icon: Users, tone: "text-indigo-600 bg-indigo-50", growth: "+22.8%" },
              { label: "Global Revenue", val: `Rs. ${(stats.revenue / 1000).toFixed(0)}k`, sub: "Platform Vol", icon: BarChart3, tone: "text-emerald-600 bg-emerald-50", growth: "+8.5%" },
              { label: "System Health", val: "99%", sub: "Service Status", icon: ShieldCheck, tone: "text-blue-600 bg-blue-50", growth: "Stable" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/40 overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group relative">
                    <div className="absolute top-0 right-0 p-4">
                       <TrendingUp className={`w-10 h-10 opacity-5 ${stat.tone.split(' ')[0]}`} />
                    </div>
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${stat.tone}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{stat.label}</p>
                      <div className="flex items-end gap-3">
                         <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{stat.val}</h3>
                         <span className={`text-xs font-black mb-1 ${stat.growth.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {stat.growth}
                         </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          {/* High Impact Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="xl:col-span-2"
             >
                <Card className="rounded-[3rem] border-0 shadow-lg shadow-slate-200/40 bg-white p-10 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                   <CardHeader className="p-0 mb-10 border-none space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Growth Intensity</CardTitle>
                            <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Ecosystem activity pulse across the last 7 days</CardDescription>
                         </div>
                         <div className="flex items-center gap-2">
                            <Badge className="bg-slate-900 text-white border-none py-1.5 px-4 font-black rounded-xl">Live Metrics</Badge>
                         </div>
                      </div>
                   </CardHeader>
                   <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={growthData} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }}
                              dy={15}
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }}
                            />
                            <Tooltip 
                              cursor={{ fill: '#f8fafc' }}
                              contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800 }}
                            />
                            <Bar dataKey="users" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={24} />
                            <Bar dataKey="boardings" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </Card>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="space-y-8"
             >
                <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-violet-100/30 bg-violet-600 text-white p-10 h-auto relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                   <div className="relative z-10 space-y-8">
                      <div className="flex items-center justify-between">
                         <h3 className="text-2xl font-black tracking-tight leading-none text-violet-100">Platform Health</h3>
                         <Zap className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div className="h-[150px] w-full opacity-60">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={healthData}>
                               <Line type="monotone" dataKey="health" stroke="#ffffff" strokeWidth={6} dot={false} />
                            </LineChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="space-y-6">
                         <div className="flex justify-between items-end border-b border-white/10 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-violet-200">Uptime Rate</span>
                            <span className="text-4xl font-black">99.8%</span>
                         </div>
                         <Button className="w-full h-12 rounded-2xl bg-white text-violet-600 hover:bg-violet-50 font-black shadow-xl">
                            Infrastructure Log
                         </Button>
                      </div>
                   </div>
                </Card>

                <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/40 bg-white p-10 space-y-6">
                   <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-900 tracking-tight">System High Alerts</h4>
                      <p className="text-xs font-bold text-slate-400">Critical items requiring intervention</p>
                   </div>
                   <div className="space-y-4">
                      {[
                        { val: 12, label: "KYC Pending", color: "text-amber-600 bg-amber-50" },
                        { val: 3, label: "Fraud Signals", color: "text-rose-600 bg-rose-50" },
                        { val: 8, label: "Server Latency", color: "text-indigo-600 bg-indigo-50" },
                      ].map((alert, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${alert.color}`}>
                           <span className="font-black text-xs uppercase tracking-widest leading-none">{alert.label}</span>
                           <span className="text-lg font-black">{alert.val}</span>
                        </div>
                      ))}
                   </div>
                </Card>
             </motion.div>
          </div>

          {/* Administrative Feed */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
             <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="rounded-[3rem] border-0 shadow-lg shadow-slate-200/40 bg-white overflow-hidden">
                   <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between">
                      <div>
                         <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Ecosystem Entrants</CardTitle>
                         <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Recently registered platform entities</CardDescription>
                      </div>
                      <Link to="/admin/landlords">
                         <Button variant="ghost" className="font-black text-violet-600 hover:bg-violet-50 rounded-xl px-4">
                            Platform Directory
                         </Button>
                      </Link>
                   </CardHeader>
                   <CardContent className="p-0 px-10 pb-10">
                      <div className="space-y-4">
                         {["Rukshan Fernando", "Amaya Holdings", "Cityline Residencies"].map((name, i) => (
                           <div key={i} className="rounded-3xl border border-slate-50 p-6 flex items-center justify-between bg-slate-50/30 group hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer">
                              <div className="flex items-center gap-5">
                                 <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {name[0]}
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-900 text-lg leading-tight">{name}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Onboarding Stream</p>
                                 </div>
                              </div>
                              <Button size="icon" className="h-10 w-10 rounded-xl bg-white text-slate-200 group-hover:text-violet-600 shadow-sm">
                                 <ArrowRight className="w-5 h-5" />
                              </Button>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </motion.div>

             <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Card className="rounded-[3rem] border-0 shadow-2xl bg-slate-900 text-white p-12 h-full flex flex-col justify-between relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl -mr-40 -mt-40"></div>
                   <div className="space-y-8 relative z-10">
                      <div className="flex items-center gap-3">
                         <Activity className="w-8 h-8 text-violet-400" />
                         <span className="text-[11px] font-black uppercase tracking-[0.4em]">Strategic Control</span>
                      </div>
                      <h3 className="text-5xl font-black tracking-tight leading-tight">Global Health Board</h3>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
                         Adjust platform-wide risk parameters, manage global landlor policies, and monitor real-time transaction health.
                      </p>
                   </div>
                   <div className="pt-16 relative z-10">
                      <Button className="h-14 px-10 rounded-2xl bg-white text-slate-900 font-black hover:bg-slate-100 transition-all shadow-xl group/cmd">
                         Open Platform Console <Zap className="w-4 h-4 ml-3 group-hover/cmd:scale-125 transition-transform" />
                      </Button>
                   </div>
                </Card>
             </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
