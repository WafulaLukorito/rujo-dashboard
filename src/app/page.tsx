'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Globe, Users, Music } from 'lucide-react';

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

          <form onSubmit={handleLogin} className="space-y-5 mb-6">
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
                  required
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
                  required
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
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all"
            >
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Log in with Google</span>
            </button>
            <button 
              type="button"
              onClick={() => handleLogin()}
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all"
            >
              <Music className="w-5 h-5 text-[#1DB954]" />
              <span>Log in with Spotify</span>
            </button>
            <button 
              type="button"
              onClick={() => handleLogin()}
              className="w-full flex items-center justify-center space-x-3 py-3 bg-[#111827]/50 hover:bg-[#374151]/50 border border-[#374151]/50 text-white font-medium rounded-xl transition-all"
            >
              <Users className="w-5 h-5 text-blue-500" />
              <span>Log in with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
