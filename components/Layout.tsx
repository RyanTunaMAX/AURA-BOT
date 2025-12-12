
import React from 'react';
import { Home as HomeIcon, Map as MapIcon, Wind, User, Bot } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  children: React.ReactNode;
  onOpenChat: () => void;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children, onOpenChat }) => {
  const navItems = [
    { id: ViewState.HOME, icon: HomeIcon, label: '任務' },
    { id: ViewState.MAP, icon: MapIcon, label: '導航' },
    { id: 'CHAT_ACTION', icon: Bot, label: '詢問', isAction: true }, // Special Action Item
    { id: ViewState.AIR, icon: Wind, label: '空氣' },
    { id: ViewState.PROFILE, icon: User, label: '我的' },
  ];

  const isChatView = currentView === ViewState.CHAT;

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Content Area */}
      <main className={`flex-1 ${isChatView ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar scroll-smooth'}`}>
        {children}
      </main>

      {/* Bottom Navigation - Hidden when in Chat View */}
      {!isChatView && (
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2 pb-safe z-50">
          <div className="flex justify-between items-center">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              
              if (item.isAction) {
                  return (
                      <button 
                          key={item.label}
                          onClick={onOpenChat}
                          className="relative -top-6 bg-gradient-to-tr from-primary to-accent text-white p-4 rounded-full shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all"
                      >
                          <item.icon size={24} />
                      </button>
                  )
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewState)}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                    ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}
                  `}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
