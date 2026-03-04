import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BoardingCard() {
    return (
        <Card className="w-[320px] shadow-sm hover:shadow-xl transition-all duration-300 border-none group overflow-hidden rounded-3xl bg-white">
            <div className="relative">
                <AspectRatio ratio={4 / 3}>
                    <img
                        src="https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=2670"
                        alt="Boarding House"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                </AspectRatio>
                <div className="absolute top-4 right-4 h-8 px-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-xs font-bold flex items-center shadow-lg">
                    $450 / mo
                </div>
            </div>

            <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-2 text-primary mb-1">
                    <Home className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Premium Stay</span>
                </div>
                <CardTitle className="text-xl font-black text-slate-900 leading-tight">Sunset Villa</CardTitle>
            </CardHeader>

            <CardContent className="p-5 pt-0 space-y-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    123 Palm Avenue, Los Angeles
                </div>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    Premium studio room with attached bathroom, shared kitchen, and high-speed fiber internet connection.
                </p>
            </CardContent>

            <CardFooter className="p-5 pt-0">
                <Button className="w-full rounded-2xl font-bold h-12 shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-all">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
}
