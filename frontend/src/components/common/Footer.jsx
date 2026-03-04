import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full py-6 bg-white border-t border-slate-100 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} StayMate System. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-primary transition-colors no-underline">Privacy</Link>
                        <Link to="/" className="hover:text-primary transition-colors no-underline">Terms</Link>
                        <Link to="/" className="hover:text-primary transition-colors no-underline">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
