import React from 'react';
import { Users, Wallet, LineChart, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Users,
        title: 'Tenant Management',
        description: 'Easily track tenant details, lease agreements, and history in one secure place.',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        icon: Wallet,
        title: 'Automated Payments',
        description: 'Set up recurring rent payments and get instant notifications for due dates.',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
    },
    {
        icon: LineChart,
        title: 'Insightful Analytics',
        description: 'Visualize your occupancy rates and financial health with interactive dashboards.',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50'
    },
    {
        icon: ShieldCheck,
        title: 'Secure & Reliable',
        description: 'Your data is protected with enterprise-grade security and regular backups.',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50'
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Capabilities</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Everything You Need</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Powerful tools designed to simplify boarding house management for owners and tenants alike.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl group">
                            <CardContent className="p-8 text-center flex flex-col items-center h-full">
                                <div className={`w-20 h-20 rounded-3xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300`}>
                                    <feature.icon className="w-10 h-10" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
