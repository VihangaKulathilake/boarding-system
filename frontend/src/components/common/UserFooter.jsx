import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from 'react-router-dom';

export default function UserFooter() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Mission */}
                    <div className="space-y-6">
                        <Link to="/client-home" className="flex items-center gap-2 text-white no-underline group transition-opacity hover:opacity-80">
                            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight">StayMate</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Empowering tenants with seamless boarding experiences and transparent property management solutions.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Explore */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/marketplace" className="hover:text-primary transition-colors no-underline">Find Boarding</Link></li>
                            <li><Link to="/my-bookings" className="hover:text-primary transition-colors no-underline">My Bookings</Link></li>
                            <li><Link to="/payments" className="hover:text-primary transition-colors no-underline">Payments</Link></li>
                            <li><Link to="/maintenance" className="hover:text-primary transition-colors no-underline">Maintenance</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/profile" className="hover:text-primary transition-colors no-underline">Account Settings</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors no-underline">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors no-underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors no-underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Get in Touch</h4>
                        <div className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">support@staymate.lk</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">+94 11 234 5678</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">No 123, Borella, Colombo 08</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    <p>&copy; {new Date().getFullYear()} StayMate. Developed by VihangaKulathilake.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-400 bg-transparent transition-colors">Safety</a>
                        <a href="#" className="hover:text-slate-400 bg-transparent transition-colors">Security</a>
                        <a href="#" className="hover:text-slate-400 bg-transparent transition-colors">Standard</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
