import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Users, 
  Pencil, 
  Search, 
  Grid2X2, 
  List, 
  Plus, 
  Filter,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import AdminNavbar from "@/components/common/AdminNavbar";
import Sidebar from "@/components/common/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const properties = [
  { id: "b001", name: "Palm Residency", location: "Nugegoda, Colombo", rooms: 20, occupied: 18, status: "Active", image: "https://images.unsplash.com/photo-1555854817-5b2260d50c63?w=800&auto=format&fit=crop&q=60" },
  { id: "b002", name: "City Nest", location: "Maharagama, Colombo", rooms: 15, occupied: 15, status: "Full", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60" },
  { id: "b003", name: "Lake View Annex", location: "Kandy Central", rooms: 12, occupied: 10, status: "Active", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Boardings() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-12 space-y-10">
          {/* Header & Search */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Building2 className="w-3 h-3" />
                Asset Management
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 mt-2">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Portfolio</span></h1>
              <p className="text-slate-500 font-medium">Manage and monitor your properties across all locations.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  placeholder="Search properties..." 
                  className="h-14 pl-12 pr-4 rounded-[1.25rem] border-none bg-white shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-indigo-600/20 font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center bg-white p-1 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-50">
                 <Button 
                   variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                   size="icon" 
                   onClick={() => setViewMode('grid')}
                   className={`rounded-xl h-12 w-12 transition-all ${viewMode === 'grid' ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
                 >
                   <Grid2X2 className="w-5 h-5" />
                 </Button>
                 <Button 
                   variant={viewMode === 'list' ? 'default' : 'ghost'} 
                   size="icon" 
                   onClick={() => setViewMode('list')}
                   className={`rounded-xl h-12 w-12 transition-all ${viewMode === 'list' ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
                 >
                   <List className="w-5 h-5" />
                 </Button>
              </div>
              <Link to="/boardings/add" className="no-underline w-full sm:w-auto">
                <Button className="h-14 px-8 rounded-[1.25rem] bg-indigo-600 text-white font-black shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95 w-full">
                  <Plus className="w-5 h-5 mr-3" /> Add Asset
                </Button>
              </Link>
            </div>
          </div>

          {/* Properties Display */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div 
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProperties.map((p) => (
                  <motion.div key={p.id} variants={cardVariants} className="group">
                    <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/40 overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full border-b-8 border-transparent hover:border-indigo-600">
                      <div className="relative h-64 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                           <Badge className={`w-fit font-black rounded-lg px-3 py-1 text-[10px] uppercase tracking-widest ${p.status === 'Full' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                             {p.status}
                           </Badge>
                           <h3 className="text-2xl font-black text-white mt-2 leading-none">{p.name}</h3>
                           <p className="text-slate-300 text-xs font-bold mt-2 flex items-center gap-1">
                             <MapPin className="w-3 h-3" /> {p.location}
                           </p>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-8 flex-grow">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Inventory</p>
                              <div className="flex items-center gap-2">
                                <BedDouble className="w-4 h-4 text-indigo-600" />
                                <span className="text-lg font-black text-slate-900">{p.rooms} Rooms</span>
                              </div>
                           </div>
                           <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupancy</p>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-emerald-600" />
                                <span className="text-lg font-black text-slate-900">{Math.round((p.occupied/p.rooms)*100)}%</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                             <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white ring-2 ring-slate-50"></div>
                                ))}
                             </div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">+{p.occupied} Tenants</span>
                          </div>
                          <Link to={`/boardings/edit/${p.id}`} className="no-underline">
                             <Button size="icon" className="h-12 w-12 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 shadow-xl transition-all">
                                <Pencil className="w-5 h-5" />
                             </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10 }}
                className="space-y-6"
              >
                {filteredProperties.map((p) => (
                  <motion.div key={p.id} variants={cardVariants}>
                     <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/40 bg-white group hover:shadow-xl transition-all duration-500 overflow-hidden border-l-8 border-transparent hover:border-indigo-600">
                        <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                           <div className="flex items-center gap-8 w-full lg:w-auto">
                              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 hidden sm:block">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3">
                                   <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                                   <Badge className={`font-black tracking-widest text-[10px] rounded-lg px-2 py-0 border-none uppercase ${p.status === 'Full' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                      {p.status}
                                   </Badge>
                                 </div>
                                 <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                                   <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> {p.location}</span>
                                   <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-blue-500" /> {p.rooms} units</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-wrap items-center gap-10 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-slate-50 pt-6 lg:pt-0 lg:pl-10">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tenants</p>
                                 <p className="text-xl font-black text-slate-800">{p.occupied} Residents</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                                 <div className="flex items-center gap-3">
                                    <span className="text-xl font-black text-indigo-600">{Math.round((p.occupied/p.rooms)*100)}%</span>
                                    <Progress value={(p.occupied/p.rooms)*100} className="w-24 h-2 bg-slate-50" indicatorClassName="bg-indigo-600" />
                                 </div>
                              </div>
                              <Link to={`/boardings/edit/${p.id}`} className="no-underline shrink-0 ml-auto lg:ml-0">
                                 <Button variant="outline" className="h-14 px-6 rounded-2xl border-slate-100 font-black text-slate-800 hover:bg-slate-50 hover:border-indigo-600/30 transition-all flex items-center gap-3 active:scale-95">
                                    <Pencil className="w-4 h-4" /> Manage
                                 </Button>
                              </Link>
                           </div>
                        </div>
                     </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] bg-slate-900 p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="space-y-4 relative z-10 text-center lg:text-left">
               <h4 className="text-3xl font-black tracking-tight leading-none">Portfolio Summary</h4>
               <p className="text-slate-400 font-medium">You are managing <span className="text-white font-bold">47 rooms</span> across <span className="text-white font-bold">3 active boardings</span>.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 relative z-10 w-full lg:w-auto">
               <div className="space-y-1 text-center">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Total Beds</p>
                  <p className="text-4xl font-black">47</p>
               </div>
               <div className="w-px h-12 bg-slate-800 hidden lg:block"></div>
               <div className="space-y-1 text-center">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Occupied</p>
                  <p className="text-4xl font-black">43</p>
               </div>
               <div className="w-px h-12 bg-slate-800 hidden lg:block"></div>
               <div className="space-y-1 text-center">
                  <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Growth</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                    <p className="text-4xl font-black">+8.2%</p>
                  </div>
               </div>
            </div>
            <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black shadow-xl relative z-10 w-full lg:w-auto">
               Platform Audit Report
            </Button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
