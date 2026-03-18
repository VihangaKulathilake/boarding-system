import React from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Star, Wifi, Wind, Car, Zap, CheckCircle2,
    Calendar, Phone, MessageCircle, ArrowLeft, Heart,
    Share2, Info, ChevronRight, Home, Layout, Mail, ExternalLink, Activity,
    BookOpen, Bath, Shirt, Droplets, DoorOpen, Bus, VolumeX, Shield, Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from 'react-router-dom';
import { getBoardingById } from "@/api/boardings";

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function BoardingDetails() {
    const { id } = useParams();
    const [boarding, setBoarding] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [activeImage, setActiveImage] = React.useState(0);

    React.useEffect(() => {
        fetchBoarding();
    }, [id]);

    const fetchBoarding = async () => {
        setLoading(true);
        try {
            const data = await getBoardingById(id);
            setBoarding(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col items-center justify-center">
            <UserNavbar />
            <motion.div 
                animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-6"
            >
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-400 font-black tracking-[0.2em] text-sm uppercase">Loading Property Data</p>
            </motion.div>
        </div>
    );

    if (!boarding) return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col items-center justify-center">
            <UserNavbar />
            <div className="text-center space-y-4">
                <Home className="w-16 h-16 text-slate-300 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900">Property Not Found</h2>
                <div className="h-2"></div>
                <Link to="/marketplace">
                    <Button className="rounded-xl font-bold px-8">Return to Marketplace</Button>
                </Link>
            </div>
        </div>
    );

    // Map real data intelligently
    const amenities = boarding.facilities && boarding.facilities.length > 0 ? boarding.facilities : boarding.amenities || [];
    const images = boarding.images && boarding.images.length > 0 ? boarding.images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80']; // Only fallback if array is literally empty
    const ownerName = boarding.owner?.name || `${boarding.owner?.firstName || 'Landlord'} ${boarding.owner?.lastName || ''}`.trim();
    const ownerEmail = boarding.owner?.email || "";
    const mapQuery = encodeURIComponent(`${boarding.address}, ${boarding.city}`);

    const renderIcon = (amenity) => {
        const a = amenity.toLowerCase();
        if (a.includes('wifi') || a.includes('internet')) return <Wifi className="w-5 h-5 text-indigo-500" />;
        if (a.includes('ac') || a.includes('air')) return <Wind className="w-5 h-5 text-cyan-500" />;
        if (a.includes('park') || a.includes('garage')) return <Car className="w-5 h-5 text-rose-500" />;
        if (a.includes('desk') || a.includes('study')) return <BookOpen className="w-5 h-5 text-blue-500" />;
        if (a.includes('bath')) return <Bath className="w-5 h-5 text-teal-500" />;
        if (a.includes('kitchen') || a.includes('cook')) return <Coffee className="w-5 h-5 text-orange-500" />;
        if (a.includes('laundry') || a.includes('iron')) return <Shirt className="w-5 h-5 text-pink-500" />;
        if (a.includes('security') || a.includes('cctv')) return <Shield className="w-5 h-5 text-slate-700" />;
        if (a.includes('water') || a.includes('filter')) return <Droplets className="w-5 h-5 text-sky-500" />;
        if (a.includes('entrance') || a.includes('door')) return <DoorOpen className="w-5 h-5 text-emerald-600" />;
        if (a.includes('bus') || a.includes('route')) return <Bus className="w-5 h-5 text-yellow-500" />;
        if (a.includes('quiet') || a.includes('environment')) return <VolumeX className="w-5 h-5 text-purple-500" />;
        return <Zap className="w-5 h-5 text-amber-500" />;
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Top Navigation Row */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <Link to="/marketplace" className="no-underline">
                        <Button variant="ghost" className="gap-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-black uppercase text-xs tracking-widest rounded-2xl group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Search
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="rounded-2xl bg-white border-slate-100 shadow-sm h-11 w-11 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all group">
                            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl bg-white border-slate-100 shadow-sm h-11 w-11 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all group">
                            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    
                    {/* Main Content Area (Left col span 2) */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 space-y-12"
                    >
                        {/* Cinematic Image Gallery */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 group">
                                <motion.img 
                                    key={activeImage}
                                    initial={{ opacity: 0.5, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    src={images[activeImage]} 
                                    alt={boarding.boardingName}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none px-4 py-1.5 rounded-xl text-xs tracking-widest uppercase font-black">
                                        {boarding.type === "full_property" ? "Entire Property" : boarding.type?.replace("_", " ") || "Room Based"}
                                    </Badge>
                                    {images.length > 1 && (
                                        <div className="bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-xs font-black tracking-widest shadow-xl">
                                            {activeImage + 1} / {images.length}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Thumbnails Row */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2 pt-2 no-scrollbar scroll-smooth">
                                    {images.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`relative shrink-0 w-28 h-20 rounded-[1rem] overflow-hidden transition-all duration-300 ${activeImage === idx ? 'ring-4 ring-indigo-600 ring-offset-2 ring-offset-slate-50 shadow-lg scale-100' : 'opacity-60 hover:opacity-100 scale-95 hover:scale-100'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx+1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Title & Core Details */}
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                                {boarding.boardingName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-bold text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-500" />
                                    {boarding.address}{boarding.city ? `, ${boarding.city}` : ''}
                                </div>
                                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-xs font-black tracking-widest uppercase">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    <span>{boarding.rating || "New"}</span>
                                </div>
                            </div>
                        </motion.div>

                        <hr className="border-slate-200" />

                        {/* Dynamic Description Area */}
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <div className="flex items-center gap-3 text-2xl font-black text-slate-900">
                                <Info className="w-8 h-8 text-indigo-500" />
                                About This Property
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                                {boarding.description}
                            </p>
                        </motion.div>

                        {/* Completely Data-Driven Amenities */}
                        {amenities.length > 0 && (
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-2xl font-black text-slate-900">
                                        <Layout className="w-8 h-8 text-indigo-500" />
                                        Facilities
                                    </div>
                                    <Badge variant="secondary" className="rounded-xl font-bold px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">{amenities.length} Included</Badge>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 drop-shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                                {renderIcon(amenity)}
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 capitalize">{amenity.replace('_', ' ')}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Location Details derived from real DB fields */}
                        <motion.div variants={fadeInUp} className="space-y-6 pb-20">
                            <div className="flex items-center gap-3 text-2xl font-black text-slate-900">
                                <MapPin className="w-8 h-8 text-indigo-500" />
                                Neighborhood Explorer
                            </div>
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                                <h4 className="font-black text-slate-900 text-2xl mb-1">{boarding.city || "Area Information Map"}</h4>
                                <p className="text-slate-500 font-bold mb-8">{boarding.address}</p>
                                
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <p className="text-sm font-medium text-slate-600 md:max-w-[60%]">
                                        For comprehensive directions and to explore the surrounding community, facilities, and transit options.
                                    </p>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="no-underline shrink-0">
                                        <Button className="rounded-xl font-black px-6 bg-slate-900 group-hover:bg-indigo-600 transition-colors w-full">
                                            Open in Google Maps <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Booking / Action Sidebar (Right col) */}
                    <div className="lg:col-span-1 h-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="sticky top-28 space-y-6"
                        >
                            <Card className="border-none shadow-[0_20px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] bg-white overflow-hidden">
                                <CardContent className="p-8 pb-10 space-y-8">
                                    {/* Price Header based strictly on DB price field */}
                                    <div>
                                        {boarding.price ? (
                                            <div className="flex items-end gap-1.5 mb-4">
                                                <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Rs. {boarding.price.toLocaleString()}</span>
                                                <span className="text-slate-400 font-bold mb-1.5 md:mb-2 uppercase text-xs tracking-widest">/month</span>
                                            </div>
                                        ) : (
                                            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Price on Request</div>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className={`border-emerald-200 bg-emerald-50 text-emerald-700 font-black px-3 py-1 text-[10px] tracking-widest uppercase`}>
                                                <Activity className="w-3.5 h-3.5 mr-1.5" /> {boarding.status || 'AVAILABLE'}
                                            </Badge>
                                            {boarding.totalRooms && (
                                                <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700 font-black px-3 py-1 text-[10px] tracking-widest uppercase">
                                                    <Home className="w-3.5 h-3.5 mr-1.5" /> {boarding.totalRooms} Rooms
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <hr className="border-slate-100" />

                                    {/* Real DB Values Mapping */}
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 transition-all hover:border-indigo-200 hover:bg-white">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Property Listed Date</div>
                                        <div className="flex items-center gap-3 font-bold text-slate-700">
                                            <Calendar className="w-5 h-5 text-indigo-500" />
                                            {new Date(boarding.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={() => ownerEmail ? window.location.href = `mailto:${ownerEmail}?subject=Interest%20in%20${encodeURIComponent(boarding.boardingName)}` : alert('Contact information currently unavailable.')}
                                        className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-all transform active:scale-95 text-lg flex items-center gap-2 mt-4"
                                    >
                                        <Mail className="w-5 h-5 shadow-sm" /> Contact Landlord
                                    </Button>
                                    <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">No commitment required</p>
                                </CardContent>
                            </Card>

                            {/* Dynamic Host/Owner Card entirely derived from owner parameter */}
                            {boarding.owner && (
                                <Card className="border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[2.5rem] bg-white p-6 mt-6 transition-all hover:border-indigo-100 hover:shadow-indigo-500/5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="w-14 h-14 border-4 border-slate-50 shadow-sm">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(ownerName)}&backgroundColor=4f46e5&textColor=ffffff`} />
                                            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-black text-xl">{ownerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-lg text-slate-900 truncate leading-tight">{ownerName}</h4>
                                            <span className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em] block truncate mt-1">
                                                {boarding.owner?.role === 'landlord' ? 'Platform Landlord' : 'Property Partner'}
                                            </span>
                                        </div>
                                    </div>
                                    {ownerEmail && (
                                        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 border border-slate-100">
                                            <MessageCircle className="w-4 h-4 text-slate-400" /> {ownerEmail}
                                        </div>
                                    )}
                                </Card>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
