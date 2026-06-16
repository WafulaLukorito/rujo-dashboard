'use client';

import { useState, useEffect } from 'react';
import { 
  Coins, TrendingUp, AlertTriangle, FileSignature, 
  Globe, ShieldAlert, CheckCircle2, MoreHorizontal, 
  Filter, PlayCircle
} from 'lucide-react';

interface ActivityEvent {
  id: string;
  category: 'financial' | 'catalog' | 'sync';
  subType: string;
  severity: 'info' | 'success' | 'warning' | 'urgent';
  title: string;
  description: string;
  amount?: number;
  date: string;
  actionable: boolean;
  metadata: any;
}

export default function ActivityPage() {
  const [events, setEvents] = [useState<ActivityEvent[]>([])][0];
  const [loading, setLoading] = [useState(true)][0];
  const [filter, setFilter] = [useState<string>('all')][0];

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/activity');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch activity logs', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [setEvents, setLoading]);

  const filteredEvents = events.filter(e => filter === 'all' || e.category === filter);

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'success': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getIcon = (subType: string) => {
    switch(subType) {
      case 'royalty_drop': return <Coins className="w-5 h-5" />;
      case 'streaming_anomaly': return <TrendingUp className="w-5 h-5" />;
      case 'split_sheet_execution': return <FileSignature className="w-5 h-5" />;
      case 'pro_registration': return <Globe className="w-5 h-5" />;
      case 'metadata_conflict': return <ShieldAlert className="w-5 h-5" />;
      case 'pitch_tracking': return <PlayCircle className="w-5 h-5" />;
      case 'contract_approval': return <FileSignature className="w-5 h-5" />;
      case 'recoupment_milestone': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Coins className="w-5 h-5" />;
    }
  };

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
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Activity & Operations</h1>
        <p className="text-gray-400 text-base md:text-lg">Real-time tracking of song lifecycles, royalty distributions, and catalog health.</p>
      </header>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-500 mr-2" />
        {['all', 'financial', 'catalog', 'sync'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
              filter === cat 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-[#1f2937]/50 text-gray-400 hover:bg-[#374151]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-[#374151]/50 to-transparent"></div>
        
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="relative pl-10 md:pl-20 pr-0 md:pr-4 group">
              {/* Timeline dot */}
              <div className={`absolute left-4 md:left-8 top-6 w-4 h-4 rounded-full border-4 border-[#080b12] shadow-sm transform -translate-x-1/2 z-10 ${
                event.severity === 'urgent' ? 'bg-red-500 animate-pulse' :
                event.severity === 'warning' ? 'bg-orange-500' :
                event.severity === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}></div>

              <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl hover:bg-[#1f2937]/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4">
                  <div className="flex items-start md:items-center space-x-3 md:space-x-4">
                    <div className={`p-2.5 md:p-3 rounded-xl border flex-shrink-0 ${getSeverityStyles(event.severity)}`}>
                      {getIcon(event.subType)}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">{event.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-gray-500">{event.category} • {event.subType.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right pl-11 md:pl-0">
                    <p className="text-gray-400 text-xs md:text-sm font-medium">
                      {new Date(event.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {event.amount && (
                      <p className="text-white font-black text-base md:text-lg mt-0.5 md:mt-1">
                        +KSh {event.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed pl-11 md:pl-0">{event.description}</p>
                
                {/* Metadata JSON tags (simulating what gets indexed for RAG) */}
                <div className="flex flex-wrap gap-2 mb-4 pl-11 md:pl-0">
                  {Object.entries(event.metadata).map(([key, value]) => (
                    <span key={key} className="text-[10px] md:text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 md:py-1 rounded-md border border-indigo-500/20">
                      {key}: {String(value)}
                    </span>
                  ))}
                </div>

                {event.actionable && (
                  <div className="mt-4 pt-4 border-t border-[#374151]/30 flex justify-end pl-11 md:pl-0">
                    <button className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg text-center ${
                      event.severity === 'urgent' 
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20'
                    }`}>
                      {event.severity === 'urgent' ? 'Resolve Conflict' : 'Review & Sign'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
