import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion } from 'framer-motion';
import {
    Plus,
    Wrench,
    Lightbulb,
    Droplets,
    Hammer,
    Shield,
    Clock,
    CheckCircle2,
    AlertCircle,
    Image as ImageIcon,
    Camera,
    MessageSquare,
    ChevronRight,
    Search,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const maintenanceRequests = [
    {
        id: "REQ-4512",
        category: "Plumbing",
        title: "Leaking faucet in kitchen",
        priority: "Medium",
        status: "In Progress",
        date: "Feb 20, 2024",
        icon: Droplets,
        color: "text-blue-500",
        bgColor: "bg-blue-50"
    },
    {
        id: "REQ-4509",
        category: "Electrical",
        title: "Main light not working",
        priority: "High",
        status: "Resolved",
        date: "Feb 18, 2024",
        icon: Lightbulb,
        color: "text-amber-500",
        bgColor: "bg-amber-50"
    }
];

const fadeInHeader = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
};

export default function Maintenance() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInHeader}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Maintenance Hub</h1>
                        <p className="text-slate-500 font-bold text-lg">Quick report and track status of property issues.</p>
                    </div>
                    <Button className="rounded-2xl h-14 px-8 font-black gap-3 shadow-xl shadow-primary/20 bg-primary hover:shadow-primary/40 transition-all active:scale-95 text-lg">
                        <Plus className="w-6 h-6" /> Create New Report
                    </Button>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-10 mb-12">
                    {/* Active Requests List */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInLeft}
                        className="lg:col-span-2 space-y-8"
                    >
                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
                            <CardHeader className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <CardTitle className="text-xl font-black text-slate-900">Active Reports</CardTitle>
                                    <CardDescription className="font-medium">Recent maintenance activities in your stay.</CardDescription>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input placeholder="Search reports..." className="pl-11 h-11 bg-slate-50 border-none rounded-xl text-sm focus:ring-primary/20" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {maintenanceRequests.map((req) => (
                                        <div key={req.id} className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:bg-slate-50 transition-all cursor-pointer group">
                                            <div className={`w-16 h-16 rounded-[1.25rem] ${req.bgColor} ${req.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                                                <req.icon className="w-8 h-8" />
                                            </div>
                                            <div className="flex-grow space-y-3">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h4 className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors">{req.title}</h4>
                                                    <Badge className={req.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border-none font-black px-3 py-1" : "bg-blue-50 text-blue-600 border-none font-black px-3 py-1"}>
                                                        {req.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                                    <span className="flex items-center gap-1.5"><Wrench className="w-3 h-3" /> {req.category}</span>
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {req.date}</span>
                                                    <span className="flex items-center gap-1.5">
                                                        <AlertCircle className={`w-3 h-3 ${req.priority === "High" ? "text-rose-500" : "text-amber-500"}`} />
                                                        {req.priority} Priority
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 group-hover:text-primary transition-colors group-hover:bg-primary/5">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-slate-50/50 border-t border-slate-50 text-center">
                                    <Button variant="link" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-primary no-underline gap-2">
                                        Open Full Request history <ArrowRight className="w-3 h-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fast Support Tools */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="border-none shadow-2xl bg-indigo-600 text-white p-8 rounded-[2.5rem] relative overflow-hidden group border-b-8 border-indigo-700">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-white/20 transition-colors"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <MessageSquare className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black tracking-tight">Support Chat</h3>
                                        <p className="text-indigo-100 font-medium">Quick answers for minor issues and guidance.</p>
                                    </div>
                                    <Button className="w-full h-12 bg-white text-indigo-600 hover:bg-slate-50 font-black rounded-xl border-none text-sm uppercase tracking-widest">Connect Now</Button>
                                </div>
                            </Card>
                            <Card className="border-none shadow-2xl bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group border-b-8 border-slate-950">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-primary/30 transition-colors"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <Shield className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black tracking-tight">Emergency</h3>
                                        <p className="text-slate-400 font-medium">For critical threats like fire, floods or theft.</p>
                                    </div>
                                    <Button className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl border-none text-sm uppercase tracking-widest">Call Helpline</Button>
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* New Report Wizard Quick View */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInRight}
                        className="space-y-8"
                    >
                        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden border-t-8 border-primary">
                            <CardHeader className="p-10 pb-0">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Express Report</h3>
                                <p className="text-slate-400 font-bold text-sm">Submit your issue in 60 seconds.</p>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <form className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Issue Category</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { icon: Droplets, label: "Plumbing", color: "blue" },
                                                { icon: Lightbulb, label: "Electric", color: "amber" },
                                                { icon: Hammer, label: "Structure", color: "slate" }
                                            ].map((item, i) => (
                                                <Button key={i} variant="outline" type="button" className={`h-24 flex flex-col gap-3 rounded-[1.5rem] border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 group`}>
                                                    <item.icon className={`w-7 h-7 text-${item.color}-500 transition-transform group-hover:scale-110`} /> {item.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Describe Problem</label>
                                        <Textarea placeholder="Elaborate on the issue..." className="min-h-[150px] bg-slate-50 border-none rounded-[1.5rem] p-6 resize-none focus:ring-primary/20 text-slate-700 font-medium" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Visual Evidence</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center cursor-pointer border-4 border-dashed border-slate-200 hover:border-primary/50 hover:text-primary transition-all text-slate-400 group">
                                                <Camera className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all bg-primary">Send Report</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <UserFooter />
        </div>
    );
}
