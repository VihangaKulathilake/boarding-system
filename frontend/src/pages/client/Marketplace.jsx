import React, { useState } from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, Wifi, Wind, Car, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useSearchParams } from 'react-router-dom';
import { getBoardings } from "@/api/boardings";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function Marketplace() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [boardingsList, setBoardingsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState("all");

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBoardings();

            const params = new URLSearchParams(searchParams);
            if (searchQuery) params.set("q", searchQuery);
            else params.delete("q");
            setSearchParams(params, { replace: true });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory, priceRange]);

    const fetchBoardings = async () => {
        try {
            setLoading(true);
            const params = {};
            if (searchQuery) params.q = searchQuery;
            if (priceRange === 'low') { params.maxPrice = 15000; }
            else if (priceRange === 'mid') { params.minPrice = 15000; params.maxPrice = 30000; }
            else if (priceRange === 'high') { params.minPrice = 30000; }

            let data = await getBoardings(params);

            if (selectedCategory !== "All") {
                const catLower = selectedCategory.toLowerCase();
                data = data.filter(b =>
                    b.boardingName?.toLowerCase().includes(catLower) ||
                    b.description?.toLowerCase().includes(catLower) ||
                    b.type?.toLowerCase().includes(catLower)
                );
            }
            setBoardingsList(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <UserNavbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Search & Filter Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
                >
                    <div className="w-full md:w-1/2 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Where do you want to stay?"
                            className="w-full pl-12 h-14 bg-white border-none shadow-sm rounded-2xl text-lg focus-visible:ring-primary/20 transition-all focus:shadow-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Select value={priceRange} onValueChange={setPriceRange}>
                            <SelectTrigger className="w-[140px] h-12 bg-white border-none shadow-sm rounded-xl focus:ring-primary/20">
                                <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Prices</SelectItem>
                                <SelectItem value="low">Under 15k</SelectItem>
                                <SelectItem value="mid">15k - 30k</SelectItem>
                                <SelectItem value="high">30k+</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="h-12 border-none shadow-sm bg-white rounded-xl gap-2 font-bold px-6 hover:bg-slate-50 active:scale-95 transition-all">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar"
                >
                    {["All", "Studio", "Shared Room", "Single Room", "Entire House", "Apartment"].map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full px-6 whitespace-nowrap border-none shadow-sm transition-all active:scale-95 ${selectedCategory === cat ? "shadow-primary/20" : "bg-white hover:bg-slate-100"}`}
                        >
                            {cat}
                        </Button>
                    ))}
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Found {boardingsList.length} Boardings</h2>
                    <p className="text-slate-500 font-medium">Showing curated matches based on your preferences</p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
                >
                    <AnimatePresence>
                        {loading && <p className="col-span-full text-center p-12 text-slate-400 font-bold italic tracking-widest">Scanning Boarding Infrastructure...</p>}
                        {!loading && boardingsList.map((boarding) => (
                            <motion.div
                                key={boarding._id}
                                variants={itemVariants}
                                layout
                                whileHover={{ y: -12 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="h-full"
                            >
                                <Link to={`/boarding/${boarding._id}`} className="block group h-full focus:outline-none">
                                    <Card className="relative h-full flex flex-col bg-white rounded-[2rem] border-none overflow-hidden transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
                                        
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <motion.img
                                                src={boarding.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60"}
                                                alt={boarding.boardingName}
                                                className="w-full h-full object-cover"
                                                initial={{ scale: 1 }}
                                                whileHover={{ scale: 1.08 }}
                                                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            />
                                            
                                            {/* Badges Overlay */}
                                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                                                <Badge className="bg-white/90 text-slate-900 hover:bg-white border-none backdrop-blur-md shadow-sm px-4 py-1.5 font-bold rounded-full">
                                                    {boarding.type || "Boarding"}
                                                </Badge>
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // Handle wishlist logic
                                                    }}
                                                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm transition-all"
                                                >
                                                    <Heart className="w-5 h-5 transition-colors" />
                                                </motion.button>
                                            </div>

                                            {/* Quick Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex items-center gap-4 text-white">
                                                {boarding.amenities?.slice(0, 2).map(amenity => (
                                                    <div key={amenity} className="flex items-center gap-1.5">
                                                        {amenity === "Wifi" && <Wifi className="w-4 h-4" />}
                                                        {amenity === "AC" && <Wind className="w-4 h-4" />}
                                                        {amenity === "Parking" && <Car className="w-4 h-4" />}
                                                        {amenity === "Laundry" && <Zap className="w-4 h-4" />}
                                                        <span className="text-xs font-medium">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <CardHeader className="p-5 pb-0">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="space-y-1.5">
                                                    <CardTitle className="text-xl font-black text-slate-900 leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                                        {boarding.boardingName}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-1.5 text-slate-500">
                                                        <MapPin className="w-4 h-4 shrink-0 text-primary/80" />
                                                        <p className="text-sm font-medium truncate">
                                                            {boarding.address || "Location Pending"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end shrink-0 gap-1 mt-1">
                                                    <div className="flex items-center gap-1 bg-amber-100/80 text-amber-700 px-2.5 py-1 rounded-lg">
                                                        <Star className="w-3.5 h-3.5 flex-shrink-0 fill-amber-500 text-amber-500" />
                                                        <span className="text-sm font-black">{boarding.rating || "New"}</span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-bold tracking-wide">
                                                        ({boarding.reviews || 0} REVIEWS)
                                                    </span>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="p-5 pt-4 flex-grow flex flex-col justify-end">
                                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                                {['Wifi', 'AC', 'Parking', 'Laundry'].filter(a => boarding.amenities?.includes(a)).map((amenity) => (
                                                    <div key={amenity} className="flex flex-col items-center gap-1.5 group/amenity">
                                                        <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover/amenity:bg-primary/10 group-hover/amenity:text-primary transition-colors duration-300">
                                                            {amenity === "Wifi" && <Wifi className="w-4 h-4" />}
                                                            {amenity === "AC" && <Wind className="w-4 h-4" />}
                                                            {amenity === "Parking" && <Car className="w-4 h-4" />}
                                                            {amenity === "Laundry" && <Zap className="w-4 h-4" />}
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!boarding.amenities || boarding.amenities.length === 0) && (
                                                    <p className="text-xs text-slate-400 font-medium italic">Basic amenities included</p>
                                                )}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between">
                                            <div>
                                                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-0.5">Monthly Rent</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-black text-slate-900 shadow-sm">
                                                        Rs. {boarding.price?.toLocaleString() || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-slate-900 group-hover:bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center gap-2"
                                            >
                                                Explore
                                                <motion.span
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 4 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    →
                                                </motion.span>
                                            </motion.div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>


        </div>
    );
}
