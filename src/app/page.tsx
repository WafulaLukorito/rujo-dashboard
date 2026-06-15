'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, ArrowUpRight, Clock, CheckCircle2, ListMusic } from 'lucide-react';

interface Financials {
  availableBalance: number;
  totalRevenueYTD: number;
  lastPayment: { amount: number; date: string };
}

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  amount?: number;
  date: string;
}

export default function Dashboard() {
  const [financials, setFinancials] = useState<Financials | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [finRes, actRes] = await Promise.all([
          fetch('/api/financials'),
          fetch('/api/activity')
        ]);
        const finData = await finRes.json();
        const actData = await actRes.json();
        setFinancials(finData);
        setActivity(actData);
      } catch (error) {
        console.error('Failed to load data:', error);
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
          <div className="absolute inset-2 rounded-full border-t-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Welcome back, The Synthetics</h1>
        <p className="text-gray-400 text-lg">Here's a quick overview of your publishing business today.</p>
      </header>

      {/* Financials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:bg-[#1f2937]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <DollarSign className="w-32 h-32 text-green-400" />
          </div>
          <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Available Balance</p>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
            ${financials?.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center text-sm text-green-400 font-semibold bg-green-400/10 w-fit px-3 py-1.5 rounded-full border border-green-400/20">
            <ArrowUpRight className="w-4 h-4 mr-1.5" />
            <span>Ready to withdraw</span>
          </div>
        </div>

        <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:bg-[#1f2937]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <TrendingUp className="w-32 h-32 text-indigo-400" />
          </div>
          <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Total Revenue YTD</p>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
            ${financials?.totalRevenueYTD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center text-sm text-indigo-400 font-semibold bg-indigo-400/10 w-fit px-3 py-1.5 rounded-full border border-indigo-400/20">
            <ArrowUpRight className="w-4 h-4 mr-1.5" />
            <span>+12.5% vs last year</span>
          </div>
        </div>

        <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:bg-[#1f2937]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <CheckCircle2 className="w-32 h-32 text-purple-400" />
          </div>
          <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Last Payment</p>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
            ${financials?.lastPayment.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center text-sm text-purple-400 font-semibold bg-purple-400/10 w-fit px-3 py-1.5 rounded-full border border-purple-400/20">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{new Date(financials?.lastPayment.date || '').toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white tracking-tight">Recent Activity</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-indigo-500/10">
            View all activity
          </button>
        </div>
        
        <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-[#374151]/30">
            {activity.map((item, index) => (
              <div key={item.id} className="p-6 hover:bg-[#374151]/30 transition-all duration-300 flex items-center justify-between group">
                <div className="flex items-center space-x-5">
                  <div className={`p-4 rounded-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                    item.type === 'royalty' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 text-green-400 border border-green-500/20' :
                    item.type === 'sync' ? 'bg-gradient-to-br from-indigo-500/20 to-blue-500/10 text-indigo-400 border border-indigo-500/20' :
                    'bg-gradient-to-br from-purple-500/20 to-pink-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {item.type === 'royalty' ? <DollarSign className="w-6 h-6" /> :
                     item.type === 'sync' ? <TrendingUp className="w-6 h-6" /> :
                     <ListMusic className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.amount && (
                    <p className="text-white font-black text-xl mb-1">
                      +${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm font-medium">
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
