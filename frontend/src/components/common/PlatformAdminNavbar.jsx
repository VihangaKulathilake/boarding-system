import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Users, Building2, BarChart3, LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { clearAuthSession } from "@/lib/auth";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Landlords", href: "/admin/landlords", icon: Building2 },
  { name: "Tenants", href: "/admin/tenants", icon: Users },
];

export default function PlatformAdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950 text-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/admin/dashboard" className="inline-flex items-center gap-2 no-underline text-white hover:opacity-90">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="font-black tracking-tight text-xl">StayMate Console</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold text-slate-200 hover:bg-white/10 no-underline"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search users, properties..."
              className="pl-9 h-9 rounded-full bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-9 w-9 p-0 hover:bg-white/10">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-emerald-600 text-white font-bold">SA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>System Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    StayMate Console
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {links.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100 no-underline font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
