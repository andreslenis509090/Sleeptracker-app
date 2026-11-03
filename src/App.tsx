/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SleepProvider, useSleep } from './context/SleepContext';
import { BrowserFrame } from './components/layout/BrowserFrame';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewPresentationView } from './components/views/OverviewPresentationView';
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { RegisterSleepView } from './components/views/RegisterSleepView';
import { HistoryView } from './components/views/HistoryView';
import { MetricsView } from './components/views/MetricsView';
import { AlertsView } from './components/views/AlertsView';
import { ProfileView } from './components/views/ProfileView';
import { AdminView } from './components/views/AdminView';
import { Moon, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView, toast, dismissToast } = useSleep();

  // In views 03, 04, 05, 06, 07, 08 the user sidebar is permanently visible as designed in the PDF
  const showUserSidebar = [
    'inicio',
    'registrar',
    'historial',
    'metricas',
    'alertas',
    'perfil',
  ].includes(currentView);

  return (
    <BrowserFrame>
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        {showUserSidebar && (
          <Sidebar activeView={currentView} onNavigate={setCurrentView} />
        )}

        <main className="flex-1 overflow-y-auto flex flex-col">
          {currentView === 'overview' && <OverviewPresentationView />}
          {(currentView === 'login' || currentView === 'registro') && (
            <LoginView />
          )}
          {currentView === 'inicio' && <DashboardView />}
          {currentView === 'registrar' && <RegisterSleepView />}
          {currentView === 'historial' && <HistoryView />}
          {currentView === 'metricas' && <MetricsView />}
          {currentView === 'alertas' && <AlertsView />}
          {currentView === 'perfil' && <ProfileView />}
          {currentView === 'admin' && <AdminView />}
        </main>
      </div>

      {/* Floating Global Toast Notification (Simulation of Page 7 toast alert) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm">
          <div className="bg-[#252529] border border-[#1fb58a] rounded-2xl p-4 shadow-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1fb58a]/20 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] shrink-0 mt-0.5">
              <Moon className="w-4 h-4 fill-[#1fb58a]" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="text-[11px] text-[#9a9aa5] flex items-center gap-1.5">
                <span className="font-semibold text-[#ececf1]">SleepHygiene</span>
                <span>·</span>
                <span>{toast.timeAgo}</span>
              </div>
              <h5 className="text-xs font-bold text-[#ececf1] mt-0.5">
                {toast.title}
              </h5>
              <p className="text-[11px] text-[#9a9aa5] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={dismissToast}
              className="text-[#9a9aa5] hover:text-[#ececf1] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </BrowserFrame>
  );
};

export default function App() {
  return (
    <SleepProvider>
      <MainLayout />
    </SleepProvider>
  );
}
