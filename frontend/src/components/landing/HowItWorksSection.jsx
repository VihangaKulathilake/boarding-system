import React from 'react';
import { UserPlus, Users, BarChart3, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    {
        number: '01',
        title: 'Sign Up & Setup',
        description: 'Create your account and set up your property profile in minutes. Add rooms, amenities, and pricing details.',
        icon: UserPlus,
        color: 'bg-blue-600',
        shadow: 'shadow-blue-200'
    },
    {
        number: '02',
        title: 'Add Tenants',
        description: 'Input tenant details and assign them to rooms easily. Send invitations for them to join the platform.',
        icon: Users,
        color: 'bg-emerald-600',
        shadow: 'shadow-emerald-200'
    },
    {
        number: '03',
        title: 'Manage & Track',
        description: 'Monitor payments, handle maintenance requests, and watch your business grow with real-time analytics.',
        icon: BarChart3,
        color: 'bg-indigo-600',
        shadow: 'shadow-indigo-200'
    }
];

export default function HowItWorksSection() {
    return (
        <section className="py-24 bg-white" id="how-it-works">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">How It Works</h2>
                    <p className="text-slate-500 text-lg">Get up and running in three simple steps.</p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block rounded-full"></div>

                    <div className="space-y-16 md:space-y-0">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
                                {/* Content Side */}
                                <div className={`flex-1 w-full order-2 ${idx % 2 !== 0 ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}>
                                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group">
                                        <div className={`h-1.5 w-full ${step.color}`}></div>
                                        <CardContent className="p-8">
                                            <span className="text-xs font-black text-slate-300 mb-2 block uppercase tracking-[0.2em]">{step.number}</span>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">{step.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Center Icon */}
                                <div className="z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-8 border-slate-50 flex items-center justify-center order-1 md:order-2 md:mx-12 shrink-0">
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${step.color} ${step.shadow} flex items-center justify-center text-white shadow-xl transition-transform duration-300 hover:scale-110`}>
                                        <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                </div>

                                {/* Placeholder for empty side */}
                                <div className={`flex-1 hidden md:block order-3 ${idx % 2 !== 0 ? 'md:order-1' : 'md:order-3'}`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 font-medium text-sm">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                        </div>
                        It's that simple to get started today.
                    </div>
                </div>
            </div>
        </section>
    );
}
