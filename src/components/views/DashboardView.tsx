import React from 'react';
import { Plus, Bell, Clock, AlertTriangle, Check, Star } from 'lucide-react';
import { useSleep } from '../../context/SleepContext';

export const DashboardView: React.FC = () => {
  const { user, records, alerts, toggleAlert, setCurrentView } = useSleep();

  // Find latest record
  const latestRecord = records[0] || {
    durationFormatted: '7 h 45 m',
    rating: 4,
    durationHours: 7.75,
  };

  // Find next alarm
  const nextAlert = alerts.find((a) => a.enabled) || alerts[0];

  // Week days chart data
  const weekData = [
    { day: 'L', hours: 8.0, isCritical: false, label: 'Lun 19' },
    { day: 'M', hours: 7.5, isCritical: true, label: 'Mar 20' },
    { day: 'M', hours: 5.5, isCritical: true, label: 'Mié 21' },
    { day: 'J', hours: 8.2, isCritical: false, label: 'Jue 22' },
    { day: 'V', hours: 6.0, isCritical: true, label: 'Vie 23' },
    { day: 'S', hours: 8.5, isCritical: false, label: 'Sáb 24' },
    { day: 'D', hours: 0, isCritical: false, label: 'Dom 25' },
  ];

  const maxChartHours = 10;
  const goalHours = user.sleepGoalHours || 8;
  const goalLineYPercent = ((maxChartHours - goalHours) / maxChartHours) * 100;

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header section with Greeting and Top Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#ececf1] tracking-tight">
            Hola, {user.name}
          </h2>
          <p className="text-xs md:text-sm text-[#9a9aa5] mt-0.5">
            Sábado, 24 de octubre de 2026
          </p>
        </div>

        <button
          onClick={() => setCurrentView('registrar')}
          className="px-4 py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs md:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Registrar sueño</span>
        </button>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs text-[#9a9aa5]">Promedio semanal</span>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#ececf1] font-mono tabular-nums">
              7.3 h
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs text-[#9a9aa5]">Meta de sueño</span>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#ececf1] font-mono tabular-nums">
              {goalHours} h
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs text-[#9a9aa5]">Días críticos</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#ef5b5b] font-mono tabular-nums">
              3
            </span>
            <span className="text-xs text-[#ef5b5b]">esta semana</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs text-[#9a9aa5]">Última noche</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#ececf1] font-mono tabular-nums">
              {latestRecord.durationFormatted || '7 h 45 m'}
            </span>
            <span className="text-xs text-[#1fb58a] font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#1fb58a]" />
              Calificación {latestRecord.rating || 4}/5
            </span>
          </div>
        </div>
      </div>

      {/* Main Body: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on Desktop): Chart */}
        <div className="lg:col-span-2 bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-xs font-bold tracking-wider text-[#9a9aa5] uppercase">
              ESTA SEMANA
            </span>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-[#9a9aa5]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1fb58a]" />
                <span>Cumple la meta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef5b5b]" />
                <span>Día crítico</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 border-b border-dashed border-[#e8b04b]" />
                <span className="text-[#e8b04b]">Meta {goalHours} h</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="relative h-64 w-full flex items-end pt-6 pb-2">
            {/* Dashed Goal Line */}
            <div
              className="absolute left-0 right-0 border-b border-dashed border-[#e8b04b]/80 z-10 pointer-events-none flex items-center"
              style={{ top: `${goalLineYPercent}%` }}
            >
              <span className="text-[10px] text-[#e8b04b] bg-[#252529] px-1 rounded absolute -top-4 right-0 font-mono">
                {goalHours} h
              </span>
            </div>

            {/* Bars container */}
            <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-4 px-2">
              {weekData.map((bar, idx) => {
                const heightPercent = (bar.hours / maxChartHours) * 100;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip value */}
                    {bar.hours > 0 && (
                      <span className="text-[11px] font-mono text-[#9a9aa5] group-hover:text-white mb-1.5 transition-colors">
                        {bar.hours}
                      </span>
                    )}

                    {/* Bar Pill */}
                    {bar.hours > 0 ? (
                      <div
                        className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 group-hover:brightness-110 ${
                          bar.isCritical ? 'bg-[#ef5b5b]' : 'bg-[#1fb58a]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    ) : (
                      <div className="w-full max-w-[42px] h-1 bg-[#3a3a41] rounded-full" />
                    )}

                    {/* Day Label */}
                    <span className="text-xs font-semibold text-[#9a9aa5] mt-3 group-hover:text-[#ececf1]">
                      {bar.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3 Action & Info Cards */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Card 1: Registro de hoy */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5">
            <span className="text-xs text-[#9a9aa5] block mb-1">Registro de hoy</span>
            <h4 className="text-lg font-bold text-[#ececf1] mb-4">
              ¿Cómo dormiste anoche?
            </h4>
            <button
              onClick={() => setCurrentView('registrar')}
              className="w-full py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Registrar mi sueño
            </button>
          </div>

          {/* Card 2: Próxima alerta */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1c1c1f] border border-[#3a3a41] flex items-center justify-center text-[#1fb58a]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#9a9aa5] block">Próxima alerta</span>
                <span className="text-sm font-semibold text-[#ececf1]">
                  {nextAlert ? `${nextAlert.type} · ${nextAlert.time}` : 'Sin alertas activas'}
                </span>
              </div>
            </div>

            {nextAlert && (
              <button
                type="button"
                onClick={() => toggleAlert(nextAlert.id)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  nextAlert.enabled ? 'bg-[#1fb58a]' : 'bg-[#3a3a41]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                    nextAlert.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            )}
          </div>

          {/* Card 3: Progreso de hoy vs. meta */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5">
            <span className="text-xs text-[#9a9aa5] block mb-2">
              Progreso de hoy vs. meta
            </span>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-[#ececf1] font-bold">7 h 45 m</span>
              <span className="text-[#9a9aa5]">{goalHours} h</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#1c1c1f] rounded-full overflow-hidden border border-[#3a3a41]/50">
              <div
                className="h-full bg-[#1fb58a] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (7.75 / goalHours) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
