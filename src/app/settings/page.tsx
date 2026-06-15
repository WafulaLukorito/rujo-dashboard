'use client';

import { useEffect, useState } from 'react';
import { User, Bell, Shield, Smartphone, CreditCard, Link as LinkIcon, PlayCircle, MonitorPlay } from 'lucide-react';

interface SettingsData {
  artistName: string;
  profile: {
    email: string;
    phone: string;
    notifications: boolean;
  };
  payout: {
    method: string;
    accountNumber: string;
    status: string;
  };
  platforms: {
    spotify: string;
    youtube: string;
    appleMusic: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const randomArtistId = Math.floor(Math.random() * 5) + 1;
        const res = await fetch(`/api/settings?artistId=${randomArtistId}`);
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-lg">Manage preferences and connected accounts for {settings?.artistName}.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Profile Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Artist / Entity Name</label>
                <input 
                  type="text" 
                  disabled 
                  value={settings?.artistName || ''}
                  className="w-full bg-[#374151]/30 border border-[#4b5563]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Management Email</label>
                <input 
                  type="email" 
                  defaultValue={settings?.profile.email}
                  className="w-full bg-[#111827]/50 border border-[#374151]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-[#1f2937]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue={settings?.profile.phone}
                  className="w-full bg-[#111827]/50 border border-[#374151]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-[#1f2937]/50"
                />
              </div>
            </div>
          </div>

          {/* Payout Methods */}
          <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Payout Method</h2>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#111827]/50 border border-[#374151]/50 rounded-2xl mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#374151]/50 rounded-xl">
                  <Smartphone className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{settings?.payout.method}</h4>
                  <p className="text-gray-400 text-sm">Account ending in {settings?.payout.accountNumber.slice(-4)}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                {settings?.payout.status}
              </span>
            </div>
            <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              + Add new payout method
            </button>
          </div>
        </div>

        {/* Sidebar / Connected Platforms */}
        <div className="space-y-8">
          <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                <LinkIcon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Connected Platforms</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-6 h-6 text-[#1DB954]" />
                  <span className="text-white font-medium">Spotify for Artists</span>
                </div>
                <span className="text-xs font-bold text-[#1DB954] bg-[#1DB954]/10 px-2 py-1 rounded-md">
                  {settings?.platforms.spotify}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MonitorPlay className="w-6 h-6 text-[#FF0000]" />
                  <span className="text-white font-medium">YouTube Studio</span>
                </div>
                <span className="text-xs font-bold text-[#FF0000] bg-[#FF0000]/10 px-2 py-1 rounded-md">
                  {settings?.platforms.youtube}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Security</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Two-factor authentication is currently enabled for this account. Your next password rotation is scheduled in 45 days.
            </p>
            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/25">
              Manage Security
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
