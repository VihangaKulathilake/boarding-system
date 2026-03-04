import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Home,
    Wallet,
    MessageSquare,
    Search,
    CreditCard,
    AlertTriangle,
    Check,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    Calendar,
    MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ClientHome() {
    const activities = [
        {
            id: 1,
            title: "Rent Payment Successful",
            subtitle: "Transaction ID: #TRX-98765",
            time: "2 days ago",
            icon: Check,
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-600"
        },
        {
            id: 2,
            title: "New Message from Landlord",
            subtitle: "Regarding upcoming maintenance...",
            time: "Yesterday",
            icon: MessageSquare,
            bgColor: "bg-amber-100",
            textColor: "text-amber-600"
        },
        {
            id: 3,
            title: "Lease Renewed",
            subtitle: "Valid until Dec 2026",
            time: "1 week ago",
            icon: CheckCircle2,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-12 flex-grow">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Welcome, Alex! 👋</h1>
                        <p className="text-slate-500 font-bold text-xl">Your property management overview for today.</p>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest bg-white px-6 py-3 rounded-[1.5rem] shadow-sm border border-slate-50">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </motion.div>

                {/* Quick Stats Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    {[
                        { label: "Current Stay", val: "Room 302", sub: "Active Lease", icon: Home, bg: "bg-blue-50", text: "text-blue-600" },
                        { label: "Next Payment", val: "Rs. 45,000", sub: "Due in 5 days", icon: Wallet, bg: "bg-amber-50", text: "text-amber-600" },
                        { label: "Messages", val: "2 New", sub: "From Landlord", icon: MessageSquare, bg: "bg-indigo-50", text: "text-indigo-600" }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeIn}>
                            <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden bg-white rounded-[2.5rem]">
                                <CardContent className="p-8 flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} ${stat.text} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.val}</h3>
                                        {stat.sub === "Active Lease" ? (
                                            <Badge className="mt-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest">
                                                {stat.sub}
                                            </Badge>
                                        ) : (
                                            <p className="text-xs text-slate-500 font-bold mt-1">{stat.sub}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main Feed */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 space-y-10"
                    >
                        {/* Quick Actions */}
                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Express Actions</CardTitle>
                                    <CardDescription className="font-medium">Direct access to frequent operations.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <Link to="/marketplace" className="no-underline">
                                        <Button variant="outline" className="w-full h-auto py-8 flex flex-col gap-4 rounded-[2rem] border-slate-50 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-primary/10 transition-all group active:scale-95">
                                            <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                <Search className="w-7 h-7" />
                                            </div>
                                            <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Find Boarding</span>
                                        </Button>
                                    </Link>
                                    <Link to="/payments" className="no-underline">
                                        <Button variant="outline" className="w-full h-auto py-8 flex flex-col gap-4 rounded-[2rem] border-slate-50 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all group active:scale-95">
                                            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                                <CreditCard className="w-7 h-7" />
                                            </div>
                                            <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Settlement</span>
                                        </Button>
                                    </Link>
                                    <Link to="/maintenance" className="no-underline">
                                        <Button variant="outline" className="w-full h-auto py-8 flex flex-col gap-4 rounded-[2rem] border-slate-50 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-rose-100 transition-all group active:scale-95">
                                            <div className="w-14 h-14 rounded-2xl bg-white text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                                                <AlertTriangle className="w-7 h-7" />
                                            </div>
                                            <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Report Issue</span>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Timeline</CardTitle>
                                    <CardDescription className="font-medium">Recent events across your stay.</CardDescription>
                                </div>
                                <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl">Full Audit Log</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="p-8 flex items-center gap-6 hover:bg-slate-50 transition-all cursor-pointer group">
                                            <div className={`w-12 h-12 rounded-2xl ${activity.bgColor} ${activity.textColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                                                <activity.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-black text-lg text-slate-900 leading-tight group-hover:text-primary transition-colors">{activity.title}</h4>
                                                <p className="text-xs text-slate-500 font-bold">{activity.subtitle}</p>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-10"
                    >
                        {/* Profile Completion Card */}
                        <Card className="border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative group rounded-[3rem] border-b-8 border-slate-950">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-primary/30 transition-colors"></div>
                            <CardContent className="p-10 space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <TrendingUp className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Trust Factor</span>
                                    </div>
                                    <h3 className="text-3xl font-black leading-tight tracking-tight">Expand Your Trust Score</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        Verified tenants are 6x more likely to secure premium properties.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-500 tracking-[0.2em]">Completion</span>
                                        <span className="text-white">70%</span>
                                    </div>
                                    <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "70%" }}
                                            transition={{ duration: 1, delay: 0.6 }}
                                            className="absolute top-0 left-0 h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <Link to="/profile" className="no-underline block">
                                    <Button className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs uppercase tracking-widest shadow-xl">
                                        Verify My Identity
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Current Space Details */}
                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[3rem]">
                            <CardHeader className="p-8 pb-0">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Your Current Residence</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-10">
                                <div className="flex gap-6">
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 text-slate-300 flex items-center justify-center shrink-0 border border-slate-100">
                                        <Home className="w-10 h-10" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                        <h4 className="font-black text-xl text-slate-900 leading-tight">Sunset Villa, RM 302</h4>
                                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            123 Palm Ave, CA
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link to="/my-bookings" className="no-underline">
                                        <Button variant="outline" className="w-full h-12 rounded-2xl border-slate-100 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                                            Manage Residency
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full h-12 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors">
                                        Contact Manager
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <UserFooter />
        </div>
    );
}
