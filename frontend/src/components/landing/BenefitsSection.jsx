import React from 'react';
import { CheckCircle2, Smartphone, MessageSquare, ShieldCheck } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BenefitsSection() {
    const benefits = [
        {
            title: "Mobile First Design",
            description: "Access your dashboard from anywhere, on any device. Perfect for improved on-the-go management.",
            icon: Smartphone
        },
        {
            title: "Transparent Communication",
            description: "Built-in messaging and notifications ensure everyone stays on the same page.",
            icon: MessageSquare
        },
        {
            title: "Cost Effective",
            description: "Save time and money with automated tools that reduce administrative overhead.",
            icon: ShieldCheck
        }
    ];

    return (
        <section className="py-24 bg-slate-50" id="benefits">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-[2rem] transform rotate-3 -z-10 scale-105"></div>
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-slate-200 p-2">
                            <AspectRatio ratio={16 / 10}>
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                                    alt="Management Dashboard"
                                    className="object-cover w-full h-full rounded-[1.5rem]"
                                />
                            </AspectRatio>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 animate-float hidden md:flex">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                                <p className="text-lg font-bold text-slate-900">+45% Time Saved</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1]">Designed for Modern Living</h2>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                We've built StayMate from the ground up to solve the real-world problems of modern property owners.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="mt-1 w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                                        <benefit.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold text-slate-900">{benefit.title}</h4>
                                        <p className="text-slate-500 text-sm md:text-base leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
