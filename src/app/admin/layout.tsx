"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  FolderOpen,
} from "lucide-react";

import { auth } from "@/lib/db";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = auth.isAuthenticated();
    setIsAuthenticated(authenticated);

    // If not authenticated and not on login page, redirect to login
    if (!authenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Don't render layout if on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00D9FF] border-t-transparent animate-spin" />
      </div>
    );
  }

  // If not authenticated, return null to avoid flashing content before redirect
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    auth.signOut();
    router.push("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Media Library", href: "/admin/media", icon: FolderOpen },
    { label: "Content & Settings", href: "/admin/settings", icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden h-16 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-md px-6 flex items-center justify-between z-30 fixed top-0 left-0 right-0">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center font-playfair font-bold text-white text-sm">
            M
          </div>
          <span className="font-playfair font-bold text-lg text-white">
            Admin Panel
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar navigation */}
      <aside
        className={cn(
          "w-64 border-r border-white/10 bg-[#0F172A]/90 backdrop-blur-xl shrink-0 z-40 fixed lg:sticky top-0 bottom-0 left-0 transition-transform duration-300 lg:translate-x-0 flex flex-col p-6 pt-24 lg:pt-8",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header (Desktop only) */}
        <div className="hidden lg:flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center font-playfair font-bold text-white text-lg shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            M
          </div>
          <div>
            <h2 className="font-playfair font-bold text-base leading-tight text-white">
              Mohamed E.
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">AEC Developer</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#00D9FF]/10 text-[#00D9FF] border-l-2 border-[#00D9FF]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                admin@eltelemy.com
              </p>
              <p className="text-slate-500 text-xs truncate">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
