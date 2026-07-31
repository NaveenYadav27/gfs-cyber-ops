import { GlobalHeader } from './GlobalHeader';
import { Sidebar } from './Sidebar';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarCollapsed } = useStore();
  const sidebarWidth = sidebarCollapsed ? 56 : 240;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[var(--color-gfs-base)]">
      {/* Global Header — always on top */}
      <GlobalHeader />

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Workspace */}
        <main id="main-scroll-container" className="flex-1 overflow-y-auto" style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div className="p-4 max-w-[1800px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
