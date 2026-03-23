import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ 
    title = "Something went wrong", 
    message = "We encountered an unexpected issue while trying to process your request. Please try again.",
    code = "500",
    onRetry = null,
    redirectPath = "/",
    redirectText = "Return Home",
    icon: Icon = AlertCircle
}) {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-background">
            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-lg w-full text-center space-y-8"
            >
                {/* Icon Container with subtle animation */}
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-red-100 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 ease-out"></div>
                    <div className="absolute inset-0 bg-red-50 rounded-[2.5rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-500 ease-out border border-red-100/50"></div>
                    <Icon className="relative w-14 h-14 text-red-500 z-10 animate-pulse" />
                </div>

                {/* Error Copy */}
                <div className="space-y-4">
                    {code && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-red-600 font-black tracking-[0.2em] uppercase text-xs bg-red-50 px-4 py-2 rounded-full inline-block border border-red-100 shadow-sm"
                        >
                            Error Code {code}
                        </motion.span>
                    )}
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-none">
                        {title}
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg px-4 md:px-8 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    {onRetry && (
                        <Button 
                            onClick={onRetry} 
                            size="lg"
                            className="w-full sm:w-auto rounded-2xl font-bold tracking-wide h-14 px-8 bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                        >
                            <RefreshCcw className="mr-2 w-5 h-5" />
                            Attempt Recovery
                        </Button>
                    )}
                    <Button 
                        variant={onRetry ? "outline" : "default"}
                        size="lg"
                        onClick={() => navigate(redirectPath)}
                        className={`w-full sm:w-auto rounded-2xl font-bold tracking-wide h-14 px-8 active:scale-95 transition-all ${
                            !onRetry ? 'shadow-xl shadow-primary/20 hover:shadow-primary/30' : 'border-border hover:bg-muted'
                        }`}
                    >
                        {!onRetry ? <Home className="mr-2 w-5 h-5" /> : <ArrowLeft className="mr-2 w-5 h-5" />}
                        {redirectText}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
