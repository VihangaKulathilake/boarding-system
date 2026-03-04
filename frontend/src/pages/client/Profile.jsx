import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCircle,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Bell,
    Lock,
    LogOut,
    Camera,
    ChevronRight,
    CheckCircle2,
    Briefcase,
    Calendar,
    Settings,
    FileUp,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Profile() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="grid lg:grid-cols-4 gap-12">

                    {/* Left Sidebar - Profile Overview */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInLeft}
                        className="lg:col-span-1 space-y-8"
                    >
                        <Card className="border-none shadow-sm rounded-[3rem] bg-white overflow-hidden text-center p-10 relative">
                            <div className="absolute top-0 left-0 w-full h-32 bg-primary/5"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="relative inline-block group">
                                    <Avatar className="w-32 h-32 border-8 border-white shadow-xl mx-auto ring-1 ring-slate-100 transition-transform duration-500 group-hover:scale-105">
                                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" className="absolute bottom-0 right-0 rounded-2xl bg-slate-900 border-4 border-white shadow-lg text-white hover:bg-primary transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">John Doe</h2>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">University Student</p>
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex flex-col gap-3">
                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black px-4 py-2 rounded-xl justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Identity Verified
                                    </Badge>
                                    <Badge className="bg-indigo-50 text-indigo-600 border-none font-black px-4 py-2 rounded-xl justify-center gap-2">
                                        <Shield className="w-4 h-4" /> Trust Score: 98
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl gap-4 font-black text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm px-6 transition-all group">
                                <UserCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> Account Settings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl gap-4 font-black text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm px-6 transition-all group">
                                <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" /> Security & Privacy
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl gap-4 font-black text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm px-6 transition-all group">
                                <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" /> Notifications
                            </Button>
                            <DropdownMenuSeparator className="mx-2 my-4" />
                            <Button variant="ghost" className="w-full justify-start h-14 rounded-2xl gap-4 font-black text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-6 transition-all group">
                                <LogOut className="w-6 h-6 group-hover:translate-x-1 transition-transform" /> Sign Out
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Main Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="lg:col-span-3 space-y-10"
                    >
                        {/* Profile Strength */}
                        <Card className="border-none shadow-2xl bg-slate-900 text-white p-10 rounded-[3rem] overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/30 transition-colors"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="shrink-0">
                                    <div className="w-24 h-24 rounded-full border-[6px] border-primary/20 flex items-center justify-center relative">
                                        <div className="w-16 h-16 rounded-full border-[6px] border-primary flex items-center justify-center">
                                            <span className="text-xl font-black">75%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 text-center md:text-left flex-grow">
                                    <h3 className="text-3xl font-black tracking-tight">Complete your profile!</h3>
                                    <p className="text-slate-400 font-medium max-w-md">Verified profiles are 5x more likely to get their boarding applications approved by landlords.</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                                            <span>Profile Strength</span>
                                            <span>Level 3 of 4</span>
                                        </div>
                                        <Progress value={75} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
                                    </div>
                                </div>
                                <Button className="shrink-0 h-14 px-8 rounded-2xl font-black bg-primary border-none shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                                    Verify ID
                                </Button>
                            </div>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Personal Details */}
                            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Personal Info</h3>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50 text-primary">
                                        <Settings className="w-5 h-5" />
                                    </Button>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name</label>
                                        <Input defaultValue="Johnathon Alexander Doe" className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Connection</label>
                                        <Input defaultValue="john.doe@university.lk" className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                        <Input defaultValue="+94 77 123 4567" className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-primary/20" />
                                    </div>
                                </div>
                            </Card>

                            {/* Verification & Trust */}
                            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 space-y-8">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Trust & Verification</h3>
                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">National ID Card</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Verified on Jan 2024</p>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                <Briefcase className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">Student ID / Work Info</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Verification pending</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-primary" />
                                    </div>

                                    <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center space-y-4 hover:border-primary/50 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/5 transition-colors">
                                            <FileUp className="w-8 h-8 text-slate-300 group-hover:text-primary transition-transform group-hover:scale-110" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Upload documents</p>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Boost your approval rate by providing more information.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Preferences */}
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Security & Notifications</h3>
                                <Badge variant="outline" className="border-slate-100 font-bold px-3">Standard Safety</Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-md transition-all">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900">Email Alerts</p>
                                        <p className="text-xs text-slate-400 font-medium">Important account updates</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-md transition-all">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900">SMS Alerts</p>
                                        <p className="text-xs text-slate-400 font-medium">Booking confirmations</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-md transition-all">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900">2-Factor Auth</p>
                                        <p className="text-xs text-slate-400 font-medium">Highly recommended</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-md transition-all">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-900">Public Profile</p>
                                        <p className="text-xs text-slate-400 font-medium">Visible to verified landlords</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <UserFooter />
        </div>
    );
}
