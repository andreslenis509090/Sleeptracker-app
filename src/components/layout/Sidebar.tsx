import React from 'react';
import {
  Home,
  Plus,
  FileText,
  BarChart3,
  Bell,
  User,
  Moon,
  Shield,
} from 'lucide-react';
import { useSleep } from '../../context/SleepContext';
import { AppView } from '../../types';

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const { user } = useSleep();

  const navItems = [
    { id: 'inicio' as AppView, label: 'Inicio', icon: Home },
    { id: 'registrar' as AppView, label: 'Registrar sueño', icon: Plus },
    { id: 'historial' as AppView, label: 'Historial', icon: FileText },
    { id: 'metricas' as AppView, label: 'Métricas', icon: BarChart3 },
    { id: 'alertas' as AppView, label: 'Alertas', icon: Bell },
    { id: 'perfil' as AppView, label: 'Perfil', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#1c1c1f] border-r border-[#3a3a41] flex flex-col justify-between p-4 shrink-0 select-none">
      {/* Top Logo & Navigation */}
      <div>
        {/* Brand */}
        <div
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 px-2 py-3 mb-6 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1fb58a]/20 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] group-hover:scale-105 transition-transform">
            <Moon className="w-5 h-5 fill-[#1fb58a]" />
          </div>
          <span className="text-lg font-bold text-[#ececf1] tracking-tight">
            SleepHygiene
          </span>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#252529] text-[#1fb58a] border border-[#3a3a41]/80 shadow-sm'
                    : 'text-[#9a9aa5] hover:text-[#ececf1] hover:bg-[#252529]/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#1fb58a]' : 'text-[#9a9aa5]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-3">
        <button
          onClick={() => onNavigate('admin')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeView === 'admin'
              ? 'bg-[#252529] text-[#1fb58a] border border-[#3a3a41]/80'
              : 'text-[#9a9aa5] hover:text-[#ececf1] hover:bg-[#252529]/50'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-[#9a9aa5]" />
          <span>Panel Admin</span>
        </button>

        {/* Bottom User Card */}
        <div
          onClick={() => onNavigate('perfil')}
          className="pt-3 border-t border-[#3a3a41]/60 flex items-center gap-3 p-2 rounded-xl hover:bg-[#252529] transition-colors cursor-pointer group"
        >
        <div className="w-9 h-9 rounded-xl bg-[#252529] border border-[#3a3a41] flex items-center justify-center text-xs font-bold text-[#1fb58a] group-hover:border-[#1fb58a]/50 transition-colors">
          AL
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#ececf1] truncate leading-tight">
            {user.name} {user.lastName}
          </p>
          <p className="text-xs text-[#9a9aa5] truncate">{user.occupation}</p>
        </div>
      </div>
    </div>
  </aside>
  );
};
