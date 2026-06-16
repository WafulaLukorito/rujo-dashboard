'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // If we are on the login page, don't show the sidebar and remove margin
  if (pathname === '/') {
    return (
      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#1f2937] px-4 flex items-center justify-between z-40 md:hidden">
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src="/rujo-logo.png" alt="Rujo Music Group" fill sizes="32px" className="object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Rujo Music</span>
        </div>
        <button 
          onClick={toggleMobileMenu} 
          className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800/50 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay / Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={closeMobileMenu} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 md:ml-72 min-w-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
