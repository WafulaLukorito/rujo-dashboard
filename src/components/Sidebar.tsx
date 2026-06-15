import Link from 'next/link';
import Image from 'next/image';
import { Home, Music, Activity, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-72 bg-[#0d1117] border-r border-[#1f2937] text-gray-300 h-screen fixed top-0 left-0 flex flex-col pt-8 pb-4">
      <div className="px-8 mb-10 flex items-center space-x-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image src="/rujo-logo.png" alt="Rujo Music Group" fill sizes="40px" className="object-contain" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Rujo Music
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#1f2937]/50 text-indigo-400 font-medium border border-[#374151]/50 shadow-sm transition-all hover:shadow-indigo-500/10">
          <Home className="h-5 w-5" />
          <span>Overview</span>
        </Link>
        <Link href="/dashboard/catalog" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#1f2937]/30 transition-all font-medium hover:text-white">
          <Music className="h-5 w-5" />
          <span>Catalog</span>
        </Link>
        <Link href="/activity" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#1f2937]/30 transition-all font-medium hover:text-white">
          <Activity className="h-5 w-5" />
          <span>Activity</span>
        </Link>
      </nav>
      <div className="px-4 mt-auto">
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20">
          <p className="text-xs font-semibold text-indigo-300 mb-1">Pro Plan Active</p>
          <p className="text-xs text-gray-400">Your next billing date is July 1st.</p>
        </div>
        <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#1f2937]/30 transition-all font-medium hover:text-white">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
