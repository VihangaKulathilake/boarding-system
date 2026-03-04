import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-slate-900 to-indigo-500/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="container mx-auto px-4 relative z-10 text-center space-y-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 border border-primary/20 text-primary-foreground text-xs font-bold tracking-widest uppercase animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Get Started Today
                </div>

                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                    Ready to Transform <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-300">Your Management?</span>
                </h2>

                <p className="text-xl text-slate-300 font-light leading-relaxed mx-auto max-w-2xl">
                    Join thousands of boarding house owners who trust StayMate for their daily operations and tenant satisfaction.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold shadow-2xl shadow-primary/20 group transform transition-all hover:scale-105">
                        Start Your Free Trial
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-slate-400 text-sm font-medium">No Credit Card Required</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-slate-400">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Cancel Anytime
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        24/7 Support
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Unlimited Properties
                    </div>
                </div>
            </div>
        </section>
    );
}
