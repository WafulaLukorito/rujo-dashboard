'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If we are on the login page, don't show the sidebar and remove margin
  if (pathname === '/') {
    return (
      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <main className="ml-72 flex-1 p-8">
        {children}
      </main>
    </>
  );
}
