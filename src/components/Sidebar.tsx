'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Music, Activity, Settings, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/catalog', label: 'Catalog', icon: Music },
    { href: '/activity', label: 'Activity', icon: Activity },
  ];

  return (
    <div className={`w-72 bg-[#0d1117] border-r border-[#1f2937] text-gray-300 h-screen fixed top-0 left-0 flex flex-col pt-8 pb-4 z-50 transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <div className="px-8 mb-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/rujo-logo.png" alt="Rujo Music Group" fill sizes="40px" className="object-contain" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Rujo Music
          </span>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium border ${
                isActive 
                  ? 'bg-[#1f2937]/50 text-indigo-400 border-[#374151]/50 shadow-sm' 
                  : 'border-transparent hover:bg-[#1f2937]/30 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20">
          <p className="text-xs font-semibold text-indigo-300 mb-1">Pro Plan Active</p>
          <p className="text-xs text-gray-400">Your next billing date is July 1st.</p>
        </div>
        <Link 
          href="/settings" 
          onClick={onClose}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium border ${
            pathname === '/settings'
              ? 'bg-[#1f2937]/50 text-indigo-400 border-[#374151]/50 shadow-sm'
              : 'border-transparent hover:bg-[#1f2937]/30 hover:text-white'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
