"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { auth } from "@/lib/db";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, go straight to dashboard
    if (auth.isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await auth.signIn(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[100px] top-1/4 left-1/4" />
      <div className="pointer-events-none absolute w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[100px] bottom-1/4 right-1/4" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#0066FF] items-center justify-center font-playfair font-bold text-white text-xl mb-4 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
            M
          </div>
          <h1 className="text-3xl font-bold text-white font-playfair">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Secure login for portfolio administration
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 md:p-10 shadow-[0_0_50px_rgba(0,217,255,0.05)]">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@eltelemy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all text-sm"
                />
              </div>
            </div>

            {/* Note box */}
            <div className="text-xs text-slate-500 leading-normal bg-white/5 border border-white/5 p-3 rounded-lg">
              <p className="font-semibold text-slate-400 mb-1">💡 Demo Admin Credentials:</p>
              <p>Email: <code className="text-slate-300 font-mono">admin@eltelemy.com</code></p>
              <p>Password: <code className="text-slate-300 font-mono">admin</code></p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 font-semibold"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
