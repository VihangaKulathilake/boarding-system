import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  MoreVertical,
  Activity,
  ArrowRight,
  Clock,
  Home,
  DoorOpen
} from "lucide-react";
import {
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
import { getBoardings } from "@/api/boardings";
import { getBookings } from "@/api/bookings";
import { getPayments } from "@/api/payments";

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
  const [stats, setStats] = React.useState({
    totalRevenue: 0,
    pendingIncome: 0,
    roomBasedCount: 0,
    roomBasedTotalRooms: 0,
    roomBasedAvailableRooms: 0,
    roomBasedBookedRooms: 0,
    fullPropertyCount: 0,
    fullPropertyAvailable: 0,
    fullPropertyBooked: 0,
    recentPayments: [],
    boardings: []
  });
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("overview"); // For toggling property lists if needed

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [boardings, bookings, payments] = await Promise.all([
        getBoardings({ mine: "true" }),
        getBookings(),
        getPayments()
      ]);

      const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((acc, p) => acc + (p.amount || 0), 0);

      const pendingIncome = payments
        .filter(p => p.status === 'pending')
        .reduce((acc, p) => acc + (p.amount || 0), 0);

      const roomBasedBoardings = boardings.filter(b => b.type === "room_based");
      const roomBasedCount = roomBasedBoardings.length;
      const roomBasedTotalRooms = roomBasedBoardings.reduce((acc, b) => acc + (b.totalRooms || 0), 0);
      const roomBasedAvailableRooms = roomBasedBoardings.reduce((acc, b) => acc + (b.availableRooms || 0), 0);
      const roomBasedBookedRooms = roomBasedTotalRooms - roomBasedAvailableRooms;

      const fullPropertyBoardings = boardings.filter(b => b.type === "full_property");
      const fullPropertyCount = fullPropertyBoardings.length;
      const fullPropertyAvailable = fullPropertyBoardings.reduce((acc, b) => acc + ((b.availableRooms || 0) > 0 ? 1 : 0), 0);
      const fullPropertyBooked = fullPropertyCount - fullPropertyAvailable;

      setStats({
        totalRevenue,
        pendingIncome,
        roomBasedCount,
        roomBasedTotalRooms,
        roomBasedAvailableRooms,
        roomBasedBookedRooms,
        fullPropertyCount,
        fullPropertyAvailable,
        fullPropertyBooked,
        recentPayments: payments.slice(0, 4),
        boardings: boardings
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const monthIdx = (currentMonth - i + 12) % 12;
      last6Months.push({ name: months[monthIdx], completed: 0, pending: 0 });
    }

    stats.recentPayments?.forEach(p => {
      const date = new Date(p.createdAt);
      const monthName = months[date.getMonth()];
      const dataPoint = last6Months.find(d => d.name === monthName);
      if (dataPoint) {
        if (p.status === 'completed') dataPoint.completed += (p.amount || 0);
        if (p.status === 'pending') dataPoint.pending += (p.amount || 0);
      }
    });

    return last6Months;
  };

  const revenueData = getRevenueData();

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: "Total Earnings", val: `Rs. ${(stats.totalRevenue / 1000).toFixed(1)}k`, sub: "Completed Payments", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Pending Incomes", val: `Rs. ${(stats.pendingIncome / 1000).toFixed(1)}k`, sub: "Awaiting Clearance", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Full Properties", val: stats.fullPropertyCount.toString().padStart(2, '0'), sub: `${stats.fullPropertyBooked} Booked / ${stats.fullPropertyAvailable} Available`, icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Room Based", val: stats.roomBasedCount.toString().padStart(2, '0'), sub: `${stats.roomBasedBookedRooms} Booked / ${stats.roomBasedAvailableRooms} Available`, icon: DoorOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="rounded-[2rem] border-0 shadow-lg shadow-slate-200/50 overflow-hidden bg-white hover:shadow-xl transition-all duration-500 group h-full">
                  <CardContent className="p-8 pb-6 flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-slate-50 text-slate-400 border-none font-bold uppercase tracking-widest text-[10px]">
                        Live
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{stat.label}</p>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter truncate">{stat.val}</h3>
                      <p className="text-xs font-bold text-slate-500 truncate">{stat.sub}</p>
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
              className="xl:col-span-2 flex flex-col"
            >
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-white p-8 group flex-1">
                <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Revenue Trajectory</CardTitle>
                    <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Completed vs Pending (Last 6 months)</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-bold">
                      <TrendingUp className="w-3 h-3 mr-1" /> High
                    </Badge>
                  </div>
                </CardHeader>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minHeight={1} minWidth={1}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                        tickFormatter={(value) => `Rs.${value / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800 }}
                        cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        name="Completed"
                        stroke="#10b981"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                      />
                      <Area
                        type="monotone"
                        dataKey="pending"
                        name="Pending"
                        stroke="#f59e0b"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorPending)"
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
              className="flex flex-col gap-6"
            >
              {/* Full Property Pie */}
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-blue-600 text-white p-6 flex flex-col items-center justify-center text-center overflow-hidden relative group flex-1">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-white/20 transition-colors duration-700"></div>
                <div className="relative z-10 w-full flex items-center justify-between">
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-black tracking-tight">Full Properties</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">{stats.fullPropertyCount} Total Assets</p>
                  </div>
                  <Home className="w-8 h-8 text-blue-200 opacity-50" />
                </div>
                <div className="h-[140px] w-full relative mt-4">
                  <ResponsiveContainer width="100%" height="100%" minHeight={1} minWidth={1}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Booked", value: stats.fullPropertyBooked },
                          { name: "Available", value: stats.fullPropertyAvailable },
                        ]}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell stroke="none" fill="#ffffff" />
                        <Cell stroke="none" fill="rgba(255,255,255,0.3)" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black">
                      {stats.fullPropertyCount > 0 ? Math.round((stats.fullPropertyBooked / stats.fullPropertyCount) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </Card>

              {/* Room Based Pie */}
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-indigo-600 text-white p-6 flex flex-col items-center justify-center text-center overflow-hidden relative group flex-1">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-white/20 transition-colors duration-700"></div>
                <div className="relative z-10 w-full flex items-center justify-between">
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-black tracking-tight">Room-Based Units</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">{stats.roomBasedTotalRooms} Total Rooms</p>
                  </div>
                  <DoorOpen className="w-8 h-8 text-indigo-200 opacity-50" />
                </div>
                <div className="h-[140px] w-full relative mt-4">
                  <ResponsiveContainer width="100%" height="100%" minHeight={1} minWidth={1}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Booked", value: stats.roomBasedBookedRooms },
                          { name: "Available", value: stats.roomBasedAvailableRooms },
                        ]}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell stroke="none" fill="#ffffff" />
                        <Cell stroke="none" fill="rgba(255,255,255,0.3)" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black">
                      {stats.roomBasedTotalRooms > 0 ? Math.round((stats.roomBasedBookedRooms / stats.roomBasedTotalRooms) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/50 bg-white overflow-hidden h-full">
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
                    {stats.recentPayments.length > 0 ? stats.recentPayments.map((tx, i) => (
                      <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all cursor-default text-lg font-black text-slate-400">
                            {tx.user?.name?.[0] || 'T'}
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{tx.user?.name || 'Tenant'}</p>
                            <p className="text-xs font-bold text-slate-400 tracking-tight">{tx.boarding?.boardingName || 'Asset'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900">Rs. {tx.amount?.toLocaleString()}</p>
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.status}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="px-8 py-10 text-center text-slate-400 font-bold">No recent transactions found</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="rounded-[3rem] border-0 shadow-2xl shadow-indigo-100/30 bg-white p-10 flex flex-col justify-between group overflow-hidden relative h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Active Capacity</h3>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">
                    Optimize your portfolio. Check real-time occupancy rates across your top properties and manage effectively.
                  </p>
                  <div className="space-y-6 pt-4">
                    {stats.boardings.slice(0, 4).map((p, i) => {
                      let total, available, booked, pct;

                      if (p.type === 'full_property') {
                        total = 1;
                        available = p.availableRooms > 0 ? 1 : 0;
                        booked = total - available;
                        pct = Math.round((booked / total) * 100);
                      } else {
                        total = p.totalRooms || 0;
                        available = p.availableRooms || 0;
                        booked = total - available;
                        pct = total > 0 ? Math.round((booked / total) * 100) : 0;
                      }

                      return (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-end">
                            <div className="space-y-1">
                              <span className="font-black text-slate-700 uppercase tracking-widest text-[10px] flex items-center gap-1">
                                {p.type === 'full_property' ? <Home className="w-3 h-3 text-blue-500" /> : <DoorOpen className="w-3 h-3 text-indigo-500" />}
                                {p.boardingName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">
                                {p.type === 'full_property' ? (booked === 1 ? 'Booked' : 'Available') : `${booked}/${total} Booked`}
                              </span>
                            </div>
                            <span className="font-black text-indigo-600">{pct}%</span>
                          </div>
                          <Progress value={pct} className="h-3 bg-slate-50" indicatorClassName={p.type === 'full_property' ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gradient-to-r from-indigo-500 to-indigo-600"} />
                        </div>
                      )
                    })}
                    {stats.boardings.length === 0 && (
                      <div className="py-4 text-center font-bold text-slate-400">No active properties to display</div>
                    )}
                  </div>
                </div>
                <Link to="/boardings" className="no-underline mt-10 block">
                  <Button variant="ghost" className="w-full h-14 rounded-2xl font-black text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all uppercase tracking-[0.2em] text-xs">
                    Expands Property Management <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}


