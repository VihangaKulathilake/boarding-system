import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion } from 'framer-motion';
import {
    MapPin,
    Star,
    Wifi,
    Wind,
    Car,
    Zap,
    Shield,
    Users,
    CheckCircle2,
    Calendar,
    Phone,
    MessageCircle,
    ArrowLeft,
    Heart,
    Share2,
    Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function BoardingDetails() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Back Button and Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <Link to="/marketplace" className="no-underline">
                        <Button variant="ghost" className="gap-2 text-slate-500 hover:text-primary transition-all font-bold group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Search
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="rounded-2xl bg-white border-none shadow-sm h-11 w-11 hover:text-rose-500 hover:shadow-md transition-all">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl bg-white border-none shadow-sm h-11 w-11 hover:text-primary hover:shadow-md transition-all">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 h-[400px] md:h-[550px]"
                >
                    <div className="md:col-span-3 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                        <img
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80"
                            alt="Main boarding"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                    </div>
                    <div className="hidden md:grid grid-rows-2 gap-4">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80"
                                alt="Secondary boarding"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="rounded-[2.5rem] overflow-hidden shadow-lg relative group">
                            <img
                                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=80"
                                alt="Third boarding"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
                                <span className="text-white font-black text-xl">+12 Photos</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 space-y-12"
                    >
                        <motion.div variants={fadeIn}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 rounded-xl uppercase tracking-widest text-[10px]">Studio</Badge>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black px-4 py-1.5 rounded-xl flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                                </Badge>
                                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    <Star className="w-3.5 h-3.5 fill-amber-600" />
                                    <span>4.8 (24 Reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Skyline Luxury Studio</h1>
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-lg">
                                <MapPin className="w-6 h-6 text-primary" />
                                123 Skyview Ave, Colombo 07, Sri Lanka
                            </div>
                        </motion.div>

                        <hr className="border-slate-100" />

                        {/* Description */}
                        <motion.div variants={fadeIn} className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Experience Premium Living</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Experience urban living at its finest in this beautifully designed luxury studio. Located in the heart of Colombo 07, this space offers modern amenities, breathtaking city views, and unparalleled convenience. Perfect for young professionals or university students who value comfort and style.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-primary font-black uppercase tracking-widest text-xs hover:gap-2 transition-all">
                                Read full description <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div variants={fadeIn} className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Luxury Amenities</h3>
                                <Badge variant="secondary" className="rounded-xl font-bold px-3">15+ Facilities</Badge>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                {[
                                    { icon: Wifi, label: "Ultrafast Wifi" },
                                    { icon: Wind, label: "Central AC" },
                                    { icon: Car, label: "Secure Parking" },
                                    { icon: Zap, label: "Laundry Care" },
                                    { icon: Shield, label: "24/7 Security" },
                                    { icon: Users, label: "Quiet Zone" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-700 font-bold group cursor-default">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all group-hover:scale-110 group-hover:shadow-md">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full sm:w-auto h-12 rounded-2xl border-slate-200 font-black px-12 hover:bg-slate-50 transition-all">
                                Show all amenities
                            </Button>
                        </motion.div>

                        {/* Location */}
                        <motion.div variants={fadeIn} className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Prime Location</h3>
                            <div className="w-full h-[350px] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-inner relative group border-4 border-white">
                                <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400 group-hover:text-primary transition-colors">
                                    <MapPin className="w-16 h-16 mb-4 animate-bounce" />
                                    <span className="font-black tracking-widest uppercase text-xs">Interactive Neighborhood Map</span>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <Card className="bg-white/95 backdrop-blur-md border-none rounded-2xl p-4 shadow-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 p-3 rounded-xl">
                                                <Info className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Proximity</p>
                                                <p className="text-sm font-bold text-slate-700 leading-none mt-1">5 mins to Campus • 2 mins to Supermarket</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Booking Sidebar */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="sticky top-28"
                        >
                            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border-t-4 border-primary">
                                <CardContent className="p-10 space-y-8">
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-end gap-1.5">
                                            <span className="text-4xl font-black text-slate-900 tracking-tighter">Rs. 25,000</span>
                                            <span className="text-slate-400 font-bold mb-1.5 uppercase text-xs tracking-widest">/mo</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl">
                                            <Star className="w-3.5 h-3.5 fill-amber-600" /> 4.8
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Check-in Policy</div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 font-bold text-slate-700">
                                                    <Calendar className="w-5 h-5 text-primary" />
                                                    Flexible Starting
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 py-6 border-y border-slate-100">
                                        <div className="flex justify-between text-slate-600 font-bold text-sm">
                                            <span className="underline decoration-slate-200">Security Deposit</span>
                                            <span className="text-slate-900">Rs. 50,000</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600 font-bold text-sm">
                                            <span className="underline decoration-slate-200">Processing Fee</span>
                                            <span className="text-slate-900">Rs. 1,500</span>
                                        </div>
                                        <div className="flex justify-between text-2xl font-black text-slate-900 pt-4">
                                            <span>Subtotal</span>
                                            <span className="text-primary tracking-tighter">Rs. 76,500</span>
                                        </div>
                                    </div>

                                    <Button className="w-full h-16 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 active:scale-[0.97] transition-all tracking-tight bg-primary">
                                        Reserve Your Space
                                    </Button>
                                    <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">Quick, Secure & Reliable Booking</p>
                                </CardContent>
                            </Card>

                            {/* Host Reveal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="relative">
                                            <Avatar className="w-16 h-16 border-4 border-slate-50">
                                                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" />
                                                <AvatarFallback>SB</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full w-5 h-5 border-2 border-white"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xl text-slate-900">Saman Bandara</h4>
                                            <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Verified Host</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Button className="rounded-2xl bg-slate-900 hover:bg-black text-white gap-3 font-black h-12 uppercase tracking-widest text-xs">
                                            <MessageCircle className="w-4 h-4" /> Direct Message
                                        </Button>
                                        <Button variant="outline" className="rounded-2xl border-slate-100 gap-3 font-black h-12 text-slate-600 uppercase tracking-widest text-xs">
                                            <Phone className="w-4 h-4" /> View Contact
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <UserFooter />
        </div>
    );
}
