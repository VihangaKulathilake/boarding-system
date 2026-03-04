import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                    <div className="relative bg-white p-8 rounded-full shadow-2xl border border-slate-100 mb-4 inline-flex items-center justify-center">
                        <AlertCircle className="w-20 h-20 text-rose-500 stroke-[1.5px]" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-7xl font-black text-slate-900 tracking-tighter">404</h1>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Page Not Found</h2>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
                    </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild className="rounded-2xl h-12 px-8 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                        <Link to="/" className="flex items-center gap-2 no-underline">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" onClick={() => window.history.back()} className="rounded-2xl h-12 px-8 font-bold border-slate-200 hover:bg-white hover:border-slate-300 transition-all">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
