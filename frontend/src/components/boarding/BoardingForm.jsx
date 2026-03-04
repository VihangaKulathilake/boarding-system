import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, MapPin, Send } from "lucide-react";

export default function BoardingForm() {
    return (
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white max-w-lg">
            <div className="h-2 w-full bg-gradient-to-r from-primary/50 to-indigo-500/50"></div>
            <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Add New Property</CardTitle>
                <CardDescription>Enter the details of your boarding house to list it.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="boardingName">Boarding Name</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input
                                    id="boardingName"
                                    placeholder="e.g. Sunset Villa"
                                    className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Full Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input
                                    id="address"
                                    placeholder="123 Main St, City, Country"
                                    className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the rooms and amenities..."
                                className="min-h-[100px] rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary/20"
                            />
                        </div>
                    </div>

                    <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all flex gap-2">
                        <Send className="w-4 h-4" />
                        List Property
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
