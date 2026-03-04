import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Home } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandingFooter() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white">
                            <Home className="w-6 h-6 text-primary" />
                            <span className="text-2xl font-bold tracking-tight">StayMate</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Making boarding house management simple, efficient, and transparent for everyone. Experience the new standard of property management.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors no-underline">Features</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors no-underline">Pricing</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors no-underline">API Resources</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-primary transition-colors no-underline">System Status</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors no-underline">About Us</Link></li>
                            <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors no-underline">Careers</Link></li>
                            <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors no-underline">Blog</Link></li>
                            <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors no-underline">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold uppercase tracking-wider text-xs">Stay Updated</h4>
                        <p className="text-slate-400 text-sm">
                            Subscribe to our newsletter for the latest updates and property management tips.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg focus-visible:ring-primary"
                            />
                            <Button className="rounded-lg shadow-lg shadow-primary/20">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/" className="hover:text-slate-300 transition-colors no-underline">Terms of Service</Link>
                        <Link to="/" className="hover:text-slate-300 transition-colors no-underline">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
