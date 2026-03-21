import React, { useState, useEffect } from 'react';
import { Home, Menu } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";

export default function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Brand */}
                <Link
                    to="/"
                    className="no-underline"
                >
                    <Logo 
                        size="lg" 
                        variant={scrolled ? "default" : "white"} 
                        textClassName="text-2xl font-extrabold"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary no-underline",
                                    scrolled ? "text-slate-600" : "text-white/90"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className={cn(
                                "rounded-full px-6",
                                !scrolled && "border-white text-white hover:bg-white hover:text-primary bg-transparent"
                            )}
                            size="sm"
                            asChild
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button
                            variant={scrolled ? "default" : "secondary"}
                            className="rounded-full px-6"
                            size="sm"
                            asChild
                        >
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(scrolled ? "text-slate-900" : "text-white")}
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-lg font-medium text-slate-600 hover:text-primary transition-colors no-underline"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <hr className="my-2" />
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" className="w-full rounded-full" asChild>
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button className="w-full rounded-full" asChild>
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
