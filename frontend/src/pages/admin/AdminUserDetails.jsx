import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Ban, 
  Activity,
  BedDouble,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  Calendar,
  AlertCircle,
  Receipt
} from "lucide-react";
import { getUserById } from "@/api/users";
import { getBoardings } from "@/api/boardings";
import { getBookings } from "@/api/bookings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";

export default function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileContext();
  }, [id]);

  const fetchProfileContext = async () => {
    try {
      setLoading(true);
      const targetUser = await getUserById(id);
      setUser(targetUser);

      if (targetUser.role === "landlord") {
        const platformBoardings = await getBoardings({ owner: id });
        setPortfolio(platformBoardings);
      } else if (targetUser.role === "tenant") {
        const tenantBookings = await getBookings({ tenantId: id });
        setBookings(tenantBookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const isLandlord = user?.role === "landlord";
  const primaryColor = isLandlord ? "violet" : "indigo";

  if (loading) {
     return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center space-y-4">
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className={`w-12 h-12 border-4 border-t-${primaryColor}-600 border-slate-200 rounded-full`}
            />
            <div className="font-black text-slate-400 uppercase tracking-widest text-xs">Synchronizing Identity Matrix...</div>
        </div>
     );
  }

  if (!user) {
     return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <AlertCircle className="w-12 h-12 text-rose-500" />
               <div className="font-black text-slate-900 text-xl tracking-tight">Identity Offline</div>
               <Button onClick={() => navigate(-1)} variant="outline" className="rounded-xl">Go Back</Button>
            </div>
        </div>
     );
  }

  // Derived real data
  const engagementCount = isLandlord ? portfolio.length : bookings.length;
  const trustScore = user.score || 100;
  const daysSinceJoined = Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));
  const securityLevel = trustScore > 90 ? "Elite" : (trustScore > 70 ? "Advanced" : "Standard");

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-violet-100 selection:text-violet-900">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-12 space-y-12">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between">
             <Button 
               variant="ghost" 
               onClick={() => navigate(-1)} 
               className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 hover:bg-white flex items-center gap-3 transition-all"
             >
                <ArrowLeft className="w-4 h-4" /> Return to Directory
             </Button>
             
             <div className="flex items-center gap-4">
                <Badge className="bg-white border-0 shadow-sm text-slate-500 font-black tracking-widest text-[9px] px-4 py-1.5 rounded-full flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System Context
                </Badge>
             </div>
          </div>

          {/* Master Profile Container */}
          <div className="space-y-8">
             
             {/* Hero Section */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative"
             >
                <div className={`h-64 md:h-80 w-full rounded-[3.5rem] bg-gradient-to-br ${isLandlord ? 'from-violet-600 via-indigo-600 to-indigo-900' : 'from-indigo-600 via-blue-600 to-blue-900'} relative overflow-hidden shadow-2xl shadow-indigo-200/50`}>
                   {/* Abstract Overlays */}
                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] -translate-y-1/2" />
                      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-300 rounded-full blur-[100px]" />
                   </div>
                   
                   {/* Header Status Bar */}
                   <div className="absolute top-8 left-10 flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
                         <Shield className="w-4 h-4 text-emerald-400" />
                         <span className="font-black text-[10px] uppercase tracking-widest text-white">{user.isVerified ? 'Trust Certified' : 'Verification Pending'}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                         <Globe className="w-4 h-4 text-blue-300" />
                         <span className="font-black text-[10px] uppercase tracking-widest text-white/90">{user.role.toUpperCase()} LEVEL {daysSinceJoined > 30 ? '2' : '1'}</span>
                      </div>
                   </div>

                   <div className="absolute bottom-10 left-10 md:left-14 flex items-end gap-10 translate-y-24 md:translate-y-0 text-white">
                      {/* Avatar Wrapper */}
                      <div className="hidden md:block w-44 h-44 rounded-[3rem] bg-white p-2 shadow-2xl relative">
                         <div className="w-full h-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-6xl font-black text-slate-300 overflow-hidden relative group">
                            {user.name?.[0]?.toUpperCase()}
                         </div>
                         <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${user.isVerified ? 'bg-emerald-500' : 'bg-amber-500'} rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg`}>
                            {user.isVerified ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                         </div>
                      </div>

                      <div className="space-y-2 pb-6 flex-1 drop-shadow-lg">
                         <div className="flex items-center gap-4">
                            <h1 className="text-5xl font-black tracking-tighter leading-none">{user.name}</h1>
                         </div>
                         <div className="flex items-center gap-6 text-white/70 font-bold">
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-300" /> {user.role === 'admin' ? 'System Root' : 'Platform Node'}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-300" /> Member since {new Date(user.createdAt).getFullYear()}</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Mobile Identity Card */}
                <div className="md:hidden mt-8 flex flex-col items-center space-y-4 px-6 text-center">
                   <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-xl">
                      <div className="w-full h-full rounded-[2rem] bg-slate-50 flex items-center justify-center text-4xl font-black text-slate-300">
                         {user.name?.[0]?.toUpperCase()}
                      </div>
                   </div>
                   <div>
                      <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
                      <p className="font-bold text-slate-400 uppercase tracking-widest text-xs mt-1">Platform {user.role}</p>
                   </div>
                </div>
             </motion.div>

             {/* Action Bar & Primary Content Integration */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Information Column */}
                <div className="lg:col-span-4 space-y-8">
                   
                   {/* Interaction Console */}
                   <Card className="rounded-[3rem] border-0 shadow-xl shadow-slate-200/40 bg-white overflow-hidden">
                      <CardContent className="p-10 space-y-8">
                         <div className="space-y-1">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Administrative Console</h3>
                            <p className="text-xs font-bold text-slate-400">Identity control & risk mitigation factors.</p>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <Button className="h-14 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                               <Ban className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" /> Suspend
                            </Button>
                            <Button variant="outline" className="h-14 rounded-2xl border-slate-100 text-rose-500 font-black hover:bg-rose-50 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                               <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" /> Deactivate
                            </Button>
                         </div>

                         <div className="pt-8 border-t border-slate-50 space-y-6">
                            <div className="flex items-center gap-5 group cursor-default">
                               <div className={`w-12 h-12 rounded-2xl bg-${primaryColor}-50 text-${primaryColor}-600 flex items-center justify-center group-hover:bg-${primaryColor}-600 group-hover:text-white transition-all`}>
                                  <Mail className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Verified Contact</p>
                                  <p className="font-bold text-slate-900 leading-none">{user.email}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-5 group cursor-default">
                               <div className={`w-12 h-12 rounded-2xl bg-${primaryColor}-50 text-${primaryColor}-600 flex items-center justify-center group-hover:bg-${primaryColor}-600 group-hover:text-white transition-all`}>
                                  <Phone className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Direct Line</p>
                                  <p className="font-bold text-slate-900 leading-none">{user.phone || "Not Enrolled"}</p>
                               </div>
                            </div>
                         </div>
                      </CardContent>
                   </Card>

                   {/* Audit Score Visualizer */}
                   <Card className="rounded-[3rem] border-0 shadow-2xl shadow-indigo-100/50 bg-slate-900 p-10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] animate-pulse" />
                      <div className="relative z-10 text-center space-y-6">
                         <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10 uppercase font-black text-[9px] tracking-widest text-indigo-300">
                            Ecosystem Integrity
                         </div>
                         <div className="space-y-1">
                            <div className={`text-7xl font-black tracking-tighter ${trustScore < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                               {trustScore}
                            </div>
                            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Net Reliability Score</p>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${trustScore}%` }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className={`h-full ${trustScore < 50 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                            />
                         </div>
                         <p className="text-slate-400 text-xs font-medium leading-relaxed">
                            Calculated dynamically based on system interactions, response latency, and peer validations.
                         </p>
                      </div>
                   </Card>
                </div>

                {/* Operations Column */}
                <div className="lg:col-span-8 space-y-10">
                   
                   {/* Quick Stats Grid */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Trust Rate", val: `${trustScore}%`, icon: Zap, color: "text-amber-500 bg-amber-50" },
                        { label: isLandlord ? "Assets" : "Bookings", val: engagementCount.toString().padStart(2, '0'), icon: Activity, color: "text-blue-500 bg-blue-50" },
                        { label: "Security Scale", val: securityLevel, icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
                        { label: "Growth Path", val: `+${Math.min(100, daysSinceJoined)}%`, icon: Globe, color: "text-indigo-500 bg-indigo-50" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex flex-col items-center justify-center text-center space-y-3 group hover:shadow-xl transition-all hover:scale-105">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                              <stat.icon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                           </div>
                           <div>
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.2">{stat.label}</p>
                              <p className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* Portfolio Grid Layout */}
                   <Card className="rounded-[3.5rem] border-0 shadow-xl shadow-slate-200/40 bg-white overflow-hidden">
                      <CardContent className="p-10 space-y-10">
                         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-50 pb-8">
                            <div className="space-y-1">
                               <Badge className={`bg-${primaryColor}-50 text-${primaryColor}-600 border-0 font-black tracking-widest text-[9px] uppercase px-3 mb-2`}>
                                  Network Assets
                               </Badge>
                               <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                  {isLandlord ? 'Property Registry' : 'Active Residences'}
                               </h3>
                               <p className="text-slate-400 font-medium">Real-time mapping of platform endpoints associated with this profile.</p>
                            </div>
                            <Button variant="ghost" className="h-12 px-6 rounded-2xl font-black text-xs text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 group">
                               Detailed Analytics <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Button>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {isLandlord ? (
                               portfolio.length === 0 ? (
                                  <div className="col-span-2 py-20 text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                                     <Building2 className="w-12 h-12 text-slate-200 mx-auto" />
                                     <p className="font-bold text-slate-400">No active assets detected in deployment matrix.</p>
                                  </div>
                               ) : (
                                  portfolio.map((boarding, idx) => (
                                     <Link to={`/admin/boardings?owner=${id}`} key={boarding._id} className="block group">
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: idx * 0.1 }}
                                          className="rounded-[2.5rem] border border-slate-100 p-6 flex flex-col space-y-6 hover:shadow-2xl hover:border-transparent transition-all cursor-pointer bg-slate-50/30 relative overflow-hidden h-full"
                                        >
                                           <div className="flex items-start justify-between">
                                              <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-sm group-hover:rotate-3 transition-transform">
                                                 <img src={boarding.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'} alt="asset view" className="w-full h-full rounded-2xl object-cover" />
                                              </div>
                                              <Badge className={`px-4 py-1 rounded-full border-0 font-black tracking-widest text-[9px] uppercase ${
                                                 boarding.status === 'approved' ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100' : 'bg-amber-50 text-amber-600 shadow-sm shadow-amber-100'
                                              }`}>
                                                 {boarding.status}
                                              </Badge>
                                           </div>
                                           <div className="space-y-4">
                                              <div className="space-y-1">
                                                 <h4 className="font-black text-xl text-slate-900 leading-tight group-hover:text-violet-600 transition-colors">{boarding.boardingName}</h4>
                                                 <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                                    {boarding.type === 'full_property' ? <Building2 className="w-3 h-3" /> : <BedDouble className="w-3 h-3" />}
                                                    {boarding.type.replace('_', ' ')}
                                                 </p>
                                              </div>
                                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                 <div className="text-lg font-black text-slate-900 tracking-tight">
                                                    Rs. {boarding.price?.toLocaleString()} <span className="text-[10px] text-slate-400 inline-block align-middle ml-1">/UNIT</span>
                                                 </div>
                                                 <Button size="icon" className="w-10 h-10 rounded-xl bg-white text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                                 </Button>
                                              </div>
                                           </div>
                                        </motion.div>
                                     </Link>
                                  ))
                               )
                            ) : (
                               bookings.length === 0 ? (
                                  <div className="col-span-2 py-20 text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                                     <Receipt className="w-12 h-12 text-slate-200 mx-auto" />
                                     <p className="font-bold text-slate-400">No registered residencies detected.</p>
                                  </div>
                               ) : (
                                 bookings.map((booking, idx) => (
                                    <Link to={`/admin/boardings?tenant=${id}`} key={booking._id} className="block group">
                                       <motion.div 
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: idx * 0.1 }}
                                          className="rounded-[2.5rem] border border-slate-100 p-6 flex flex-col space-y-6 hover:shadow-2xl hover:border-transparent transition-all cursor-pointer bg-slate-50/30 relative overflow-hidden h-full"
                                       >
                                          <div className="flex items-start justify-between">
                                             <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-sm group-hover:rotate-3 transition-transform">
                                                <img src={booking.boarding?.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'} alt="asset view" className="w-full h-full rounded-2xl object-cover" />
                                             </div>
                                             <Badge className="px-4 py-1 rounded-full border-0 font-black tracking-widest text-[9px] uppercase bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100">
                                                {booking.status}
                                             </Badge>
                                          </div>
                                          <div className="space-y-4">
                                             <div className="space-y-1">
                                                <h4 className="font-black text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                                   {booking.boarding?.boardingName}
                                                </h4>
                                                <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                                   <MapPin className="w-3 h-3" /> {booking.boarding?.city}
                                                </p>
                                             </div>
                                             <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <div className="text-sm font-black text-slate-500 tracking-tight">
                                                   CHECK-IN: {new Date(booking.checkInDate).toLocaleDateString()}
                                                </div>
                                                <Button size="icon" className="w-10 h-10 rounded-xl bg-white text-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                                   <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </Button>
                                             </div>
                                          </div>
                                       </motion.div>
                                    </Link>
                                 ))
                               )
                            )}
                         </div>
                      </CardContent>
                   </Card>

                   {/* System Timeline / Chronology */}
                   <Card className="rounded-[3rem] border-0 shadow-lg shadow-slate-200/40 bg-white">
                      <CardContent className="p-10 space-y-8">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                               <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Immutable Audit Trail</h3>
                         </div>
                         
                         <div className="relative pl-10 space-y-10">
                            {/* Vertical Line */}
                            <div className="absolute left-[1.375rem] top-2 bottom-2 w-0.5 bg-slate-100" />
                            
                            <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               className="relative"
                            >
                               <div className="absolute -left-[32px] w-4 h-4 rounded-full bg-white border-4 border-indigo-600 z-10 shadow-sm shadow-indigo-200" />
                               <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                     <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Identity Provisioned</span>
                                     <Badge className="bg-indigo-50 text-indigo-600 border-0 font-black text-[9px] rounded-md px-2 py-0">GENESIS</Badge>
                                  </div>
                                  <p className="text-sm font-medium text-slate-400">User successfully onboarded and authorized within the ecosystem.</p>
                                  <p className="text-[10px] font-black text-slate-300 tracking-widest uppercase">{new Date(user.createdAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                               </div>
                            </motion.div>

                            {engagementCount > 0 && (
                               <motion.div 
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="relative"
                               >
                                  <div className={`absolute -left-[32px] w-4 h-4 rounded-full bg-white border-4 border-${primaryColor}-500 z-10 shadow-sm shadow-${primaryColor}-200`} />
                                  <div className="space-y-2">
                                     <div className="flex items-center gap-3">
                                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">First Activity Logged</span>
                                        <Badge className={`bg-${primaryColor}-50 text-${primaryColor}-600 border-0 font-black text-[9px] rounded-md px-2 py-0`}>ENGAGEMENT</Badge>
                                     </div>
                                     <p className="text-sm font-medium text-slate-400">Initial {isLandlord ? 'property listing' : 'booking request'} recorded on the platform.</p>
                                  </div>
                               </motion.div>
                            )}
                         </div>
                      </CardContent>
                   </Card>

                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
