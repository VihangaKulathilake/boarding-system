import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BadgeCheck, 
  UserRound, 
  Mail, 
  Phone, 
  Ban, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";
import PlatformAdminNavbar from "@/components/common/PlatformAdminNavbar";
import PlatformAdminSidebar from "@/components/common/PlatformAdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUsers } from "@/api/users";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function AdminTenants() {
  const [tenantsList, setTenantsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setTenantsList(data.filter(u => u.role === 'tenant'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = tenantsList.filter(t => 
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <PlatformAdminNavbar />
      <div className="flex">
        <PlatformAdminSidebar />
        <main className="flex-1 p-6 lg:p-12 space-y-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col xl:flex-row xl:items-end justify-between gap-8"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Fingerprint className="w-3 h-3" />
                Global Resident Directory
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 mt-2">Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Tenants</span></h1>
              <p className="text-slate-500 font-medium max-w-lg">
                Verified identity matching, trust score monitoring, and global residence policy enforcement.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  placeholder="Search tenants..." 
                  className="h-14 pl-12 pr-4 rounded-[1.25rem] border-none bg-white shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-indigo-600/20 font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-14 px-6 rounded-[1.25rem] border-slate-200 bg-white grid place-items-center">
                <Filter className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: "Total Residents", val: "2,184", icon: UserRound, color: "text-blue-500" },
               { label: "Verified Scale", val: "84%", icon: BadgeCheck, color: "text-emerald-500" },
               { label: "Risk Signals", val: "03", icon: ShieldAlert, color: "text-rose-500" },
               { label: "Avg Trust Score", val: "88", icon: Fingerprint, color: "text-indigo-500" },
             ].map((stat, i) => (
               <Card key={i} className="rounded-3xl border-0 shadow-sm p-5 bg-white flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-slate-50 ${stat.color} flex items-center justify-center`}>
                     <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                     <p className="text-xl font-black text-slate-900 mt-0.5">{stat.val}</p>
                  </div>
               </Card>
             ))}
          </div>

          {/* Directory List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {loading && <p className="text-center p-12 text-slate-400 font-bold">Scanning tenant signatures...</p>}
            {!loading && filteredTenants.map((tenant) => (
              <motion.div key={tenant._id} variants={itemVariants}>
                <Card className="rounded-[2.5rem] border-0 shadow-lg shadow-slate-200/40 bg-white group hover:shadow-2xl transition-all duration-500 overflow-hidden border-b-8 border-transparent hover:border-indigo-600">
                  <div className="p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                     <div className="flex items-center gap-8 flex-1">
                        <div className="relative group">
                           <div className="w-20 h-20 rounded-[1.75rem] border-4 border-slate-100 bg-slate-50 flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                              {tenant.name?.[0] || "?"}
                           </div>
                           {tenant.verified && (
                             <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-lg">
                                <CheckCircle2 className="w-4 h-4" />
                             </div>
                           )}
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-4">
                              <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{tenant.name}</h3>
                              <Badge className={`font-black tracking-widest text-[10px] rounded-lg px-2 py-0 border-none uppercase ${tenant.verified ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                 {tenant.verified ? 'ID MATCHED' : 'UNVERIFIED'}
                              </Badge>
                           </div>
                           <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400">
                              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-indigo-400" /> {tenant.email}</span>
                              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-violet-400" /> {tenant.phone}</span>
                               <span className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">REF: {tenant._id.substring(0, 8)}</span>
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-wrap items-center gap-12 border-t xl:border-t-0 xl:border-l border-slate-50 pt-8 xl:pt-0 xl:pl-12 w-full xl:w-auto">
                        <div className="space-y-2 text-center">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Trust Score</p>
                           <p className={`text-4xl font-black ${tenant.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{tenant.score}</p>
                           <div className="h-1.5 w-24 bg-slate-50 rounded-full overflow-hidden mx-auto">
                              <div className={`h-full ${tenant.score > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${tenant.score}%` }}></div>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-3 ml-auto xl:ml-0">
                           <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-black shadow-xl hover:shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95 group/btn">
                              Open Profile <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                           </Button>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-100 hover:bg-slate-50">
                                    <MoreVertical className="w-5 h-5 text-slate-400" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl p-2 border-slate-100 shadow-2xl">
                                 <DropdownMenuItem className="rounded-xl font-bold p-3 cursor-pointer">Verify Identity</DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl font-bold p-3 cursor-pointer">Block Account</DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl font-bold p-3 cursor-pointer text-rose-600">Impersonation Flag</DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                     </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Compliance & Policy Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-white border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm"
          >
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 text-indigo-600 flex items-center justify-center">
                   <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                   <h4 className="text-xl font-black text-slate-900 tracking-tight">System Policy Compliance</h4>
                   <p className="text-slate-400 font-medium max-w-sm">Tenant data is encrypted and handled according to global privacy standards.</p>
                </div>
             </div>
             <div className="flex items-center gap-4 w-full md:w-auto">
                <Button variant="ghost" className="font-black text-indigo-600 hover:bg-indigo-50 h-14 px-8 rounded-2xl">Privacy Audit</Button>
                <Button className="bg-slate-900 text-white font-black h-14 px-8 rounded-2xl hover:bg-slate-800 transition-all shadow-xl">Data Policy</Button>
             </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
