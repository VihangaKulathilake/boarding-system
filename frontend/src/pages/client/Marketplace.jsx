import React, { useState } from 'react';
import UserNavbar from '../../components/common/UserNavbar';
import UserFooter from '../../components/common/UserFooter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, Wifi, Wind, Car, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';

const boardings = [
    {
        id: 1,
        title: "Skyline Studio",
        location: "Colombo 07",
        price: 25000,
        rating: 4.8,
        reviews: 24,
        type: "Studio",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60",
        amenities: ["Wifi", "AC", "Parking"]
    },
    {
        id: 2,
        title: "Green Hill Boarding",
        location: "Kandy",
        price: 15000,
        rating: 4.5,
        reviews: 12,
        type: "Shared",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60",
        amenities: ["Wifi", "Laundry"]
    },
    {
        id: 3,
        title: "Urban Loft",
        location: "Galle Face",
        price: 45000,
        rating: 4.9,
        reviews: 30,
        type: "Single",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&auto=format&fit=crop&q=60",
        amenities: ["Wifi", "AC", "Gym", "Security"]
    },
    {
        id: 4,
        title: "Cozy Corner",
        location: "Nugegoda",
        price: 12000,
        rating: 4.2,
        reviews: 18,
        type: "Shared",
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60",
        amenities: ["Wifi", "Parking"]
    }
];

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
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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
                        <Select>
                            <SelectTrigger className="w-[140px] h-12 bg-white border-none shadow-sm rounded-xl focus:ring-primary/20">
                                <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
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
                    {["All", "Studio", "Shared Room", "Single Room", "Entire House", "Apartedment"].map((cat) => (
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
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Found {boardings.length} Boardings</h2>
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
                        {boardings.map((boarding) => (
                            <motion.div
                                key={boarding.id}
                                variants={itemVariants}
                                layout
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link to={`/boarding/${boarding.id}`} className="no-underline block group">
                                    <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-[2rem] bg-white h-full flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={boarding.image}
                                                alt={boarding.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-md font-black shadow-sm px-3 py-1">
                                                    {boarding.type}
                                                </Badge>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="absolute top-4 right-4 rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white border-none shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Handle wishlist
                                                }}
                                            >
                                                <Heart className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <CardHeader className="p-6 pb-0 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-xl font-black text-slate-900 leading-tight">
                                                        {boarding.title}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        {boarding.location}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-xl">
                                                        <Star className="w-3.5 h-3.5 fill-amber-600" />
                                                        <span className="text-xs font-black">{boarding.rating}</span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-bold">({boarding.reviews})</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6 pt-4 flex-grow">
                                            <div className="flex gap-4">
                                                {boarding.amenities.map(amenity => (
                                                    <div key={amenity} className="flex flex-col items-center gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                                        {amenity === "Wifi" && <Wifi className="w-4 h-4 text-primary" />}
                                                        {amenity === "AC" && <Wind className="w-4 h-4 text-primary" />}
                                                        {amenity === "Parking" && <Car className="w-4 h-4 text-primary" />}
                                                        {amenity === "Laundry" && <Zap className="w-4 h-4 text-primary" />}
                                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black leading-none">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-black text-slate-900">Rs. {boarding.price.toLocaleString()}</span>
                                                <span className="text-xs text-slate-400 font-bold uppercase">/mo</span>
                                            </div>
                                            <Button size="lg" className="rounded-2xl font-black px-6 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                                                Explore
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <UserFooter />
        </div>
    );
}
