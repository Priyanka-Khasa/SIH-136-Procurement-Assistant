import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Bell, Search, Command } from 'lucide-react';
import { CommandPalette } from '../ui/CommandPalette';
import { Outlet } from 'react-router-dom';
import { isLocalDemoToken } from '../../lib/demoMode';

export const AppShell: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const syntheticOffline = isLocalDemoToken(window.localStorage.getItem('pilotproof-token'));

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className='flex h-screen bg-bg overflow-hidden'>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className='flex-1 flex flex-col min-w-0'>
        <header className='h-16 shrink-0 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-10 sticky top-0'>
          <div className='flex items-center text-sm text-muted'>
            <span className='hover:text-text cursor-pointer transition-colors'>Workspace</span>
            <span className='mx-2'>/</span>
            <span className='text-text font-medium'>Dashboard</span>
          </div>

          <div className='flex items-center gap-4'>
            <button 
              onClick={() => setCmdOpen(true)}
              className='flex items-center gap-2 px-3 py-1.5 bg-raised border border-border rounded-md text-sm text-muted hover:text-text transition-colors focus-ring'
            >
              <Search size={16} />
              <span>Search...</span>
              <div className='flex items-center gap-0.5 ml-2 text-[10px] font-mono opacity-60'>
                <Command size={10} /> <span>K</span>
              </div>
            </button>
            
            <button className='relative p-2 text-muted hover:text-text rounded-full hover:bg-raised transition-colors focus-ring'>
              <Bell size={20} />
              <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full border border-surface'></span>
            </button>
            
            <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-saffron to-rose cursor-pointer shadow-glow'></div>
          </div>
        </header>
        
        {syntheticOffline && <div role='status' className='shrink-0 border-b border-amber-300 bg-amber-50 px-6 py-2 text-center text-xs font-medium text-amber-950'>Synthetic offline demo · actions are not saved to the backend</div>}
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
};
