import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    FileText,
    MessageSquare,
    ExternalLink,
    ChevronRight,
    Home,
    History,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookings = [
    {
        id: "BK-7821",
        title: "Sunset Villa, Room 302",
        location: "123 Palm Ave, Colombo",
        status: "Active",
        startDate: "Jan 15, 2024",
        expiryDate: "Jan 15, 2025",
        price: 35000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: "BK-9012",
        title: "Urban Loft",
        location: "Galle Face, Colombo",
        status: "Pending",
        startDate: "Mar 01, 2024",
        expiryDate: "Mar 01, 2025",
        price: 45000,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&auto=format&fit=crop&q=60"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

export default function MyBookings() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Stays</h1>
                        <p className="text-slate-500 font-bold text-lg">Manage your active boardings and lease history.</p>
                    </div>
                </motion.div>

                <Tabs defaultValue="active" className="w-full">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <TabsList className="bg-white p-1.5 rounded-[1.5rem] shadow-sm mb-10 border border-slate-100 h-16 w-full max-w-2xl">
                            <TabsTrigger value="active" className="rounded-xl px-10 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all">
                                Active Stays
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="rounded-xl px-10 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all">
                                Pending Requests
                            </TabsTrigger>
                            <TabsTrigger value="past" className="rounded-xl px-10 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white h-full transition-all">
                                History
                            </TabsTrigger>
                        </TabsList>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <TabsContent value="active" className="space-y-8 outline-none mt-0">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                {bookings.filter(b => b.status === "Active").map((booking) => (
                                    <motion.div key={booking.id} variants={itemVariants}>
                                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col lg:flex-row">
                                                    <div className="lg:w-80 h-64 lg:h-auto overflow-hidden relative">
                                                        <img src={booking.image} alt={booking.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                        <div className="absolute top-6 left-6">
                                                            <Badge className="bg-emerald-500 text-white border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest shadow-lg">
                                                                {booking.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow p-8 lg:p-10 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex items-center justify-between mb-4">
                                                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{booking.id}</span>
                                                                <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-primary">
                                                                    <ArrowUpRight className="w-5 h-5" />
                                                                </Button>
                                                            </div>
                                                            <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">{booking.title}</h3>
                                                            <div className="flex items-center gap-2 text-slate-400 font-bold mb-8">
                                                                <MapPin className="w-4 h-4 text-primary" />
                                                                {booking.location}
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lease Period</p>
                                                                    <div className="flex items-center gap-3 font-black text-slate-700">
                                                                        <Calendar className="w-4 h-4 text-primary" />
                                                                        {booking.startDate} - {booking.expiryDate}
                                                                    </div>
                                                                </div>
                                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Rent</p>
                                                                    <div className="flex items-center gap-3 font-black text-slate-700">
                                                                        <CreditCard className="w-4 h-4 text-emerald-500" />
                                                                        Rs. {booking.price.toLocaleString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-slate-50">
                                                            <Button className="rounded-2xl font-black h-12 px-8 gap-3 shadow-lg shadow-primary/20 bg-primary group-hover:shadow-primary/40 transition-shadow transition-all active:scale-95">
                                                                <FileText className="w-4 h-4" /> View Lease Agreement
                                                            </Button>
                                                            <Button variant="outline" className="rounded-2xl border-slate-100 font-black h-12 px-8 gap-3 bg-white hover:bg-slate-50 transition-all active:scale-95 text-slate-600">
                                                                <MessageSquare className="w-4 h-4" /> Message Landlord
                                                            </Button>
                                                            <Button variant="ghost" className="rounded-2xl font-black text-primary hover:bg-primary/5 transition-all ml-auto gap-2">
                                                                Property Details <ChevronRight className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="pending" className="space-y-6 outline-none mt-0">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {bookings.filter(b => b.status === "Pending").map((booking) => (
                                    <motion.div key={booking.id} variants={itemVariants}>
                                        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem] opacity-90 hover:opacity-100 transition-all hover:shadow-xl duration-500">
                                            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                                                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden shrink-0 shadow-inner">
                                                    <img src={booking.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow text-center md:text-left">
                                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                                        <h3 className="text-2xl font-black text-slate-900">{booking.title}</h3>
                                                        <Badge className="bg-amber-100 text-amber-600 border-none font-black text-[10px] uppercase tracking-widest px-3">Reviewing Application</Badge>
                                                    </div>
                                                    <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-2">
                                                        <MapPin className="w-4 h-4 text-primary" /> {booking.location}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3 w-full md:w-auto">
                                                    <Button variant="outline" className="flex-grow md:flex-none rounded-xl border-slate-100 text-slate-400 font-black h-12 px-6 hover:text-rose-500 hover:border-rose-100 transition-all">Withdraw</Button>
                                                    <Button variant="outline" className="flex-grow md:flex-none rounded-xl border-slate-100 text-slate-900 font-black h-12 px-6 hover:bg-slate-50 transition-all">Application Status</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="past" className="outline-none mt-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200"
                            >
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <History className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No history recorded</h3>
                                <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">Your stay history and finalized lease agreements will appear here safely.</p>
                                <Button className="mt-8 rounded-xl font-black px-8 h-12 bg-slate-900 hover:bg-black transition-all">Explore Marketplace</Button>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </main>

            <UserFooter />
        </div>
    );
}
