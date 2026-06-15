'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b12] text-white p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative">
          
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 mb-4">
              <Image src="/rujo-logo.png" alt="Rujo Music Group" fill sizes="64px" className="object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Welcome to Rujo Music</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to your publisher dashboard</p>
          </div>

          <form onSubmit={handleLogin} noValidate className="space-y-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="email" 
                  placeholder="name@rujomusic.com"
                  className="w-full bg-[#111827]/60 border border-[#374151]/60 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-[#111827]/80"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#111827]/60 border border-[#374151]/60 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-[#111827]/80"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 mt-6"
            >
              <LogIn className="w-5 h-5" />
              <span>Log in to Dashboard</span>
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#374151]/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#141b25] text-gray-500 font-medium rounded-full">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              type="button"
              onClick={() => handleLogin()}
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.386-2.87-6.386-6.39 0-3.52 2.877-6.39 6.386-6.39 1.64 0 3.124.62 4.267 1.621l3.072-3.072C19.123 2.304 15.86 1 12.24 1 5.923 1 1 5.92 1 12.24s4.923 11.24 11.24 11.24c6.582 0 11.24-4.53 11.24-11.24 0-.768-.06-1.502-.19-2.207l-11.05.052z"/>
              </svg>
              <span>Log in with Google</span>
            </button>
            <button 
              type="button"
              onClick={() => handleLogin()}
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.98-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.743 3.856-.88 7.15-.51 9.818 1.122.295.18.387.563.21.864zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.67-1.114 8.243-.57 11.346 1.33.367.226.488.708.26 1.084zm.106-2.833C14.382 8.797 8.514 8.6 5.12 9.63c-.52.158-1.077-.14-1.235-.662-.158-.52.14-1.077.662-1.235 3.9-1.185 10.39-.96 14.45 1.45.47.28.623.89.343 1.36-.28.47-.89.622-1.36.342z"/>
              </svg>
              <span>Log in with Spotify</span>
            </button>
            <button 
              type="button"
              onClick={() => handleLogin()}
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              <span>Log in with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
