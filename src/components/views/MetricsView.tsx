import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Plus } from 'lucide-react';
import { useSleep } from '../../context/SleepContext';

export const MetricsView: React.FC = () => {
  const { user, records, setCurrentView } = useSleep();

  // Week switcher
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const weeks = [
    { label: '19 – 25 octubre', criticalCount: 3, avg: '7.3 h', best: '8.5 h', worst: '5.5 h' },
    { label: '12 – 18 octubre', criticalCount: 1, avg: '7.9 h', best: '8.8 h', worst: '6.5 h' },
    { label: '5 – 11 octubre', criticalCount: 2, avg: '7.4 h', best: '8.2 h', worst: '5.8 h' },
  ];

  const currentWeek = weeks[currentWeekIndex];

  const chartBars = [
    { day: 'L', hours: 8.0, isCritical: false },
    { day: 'M', hours: 7.5, isCritical: true },
    { day: 'M', hours: 5.5, isCritical: true },
    { day: 'J', hours: 8.2, isCritical: false },
    { day: 'V', hours: 6.0, isCritical: true },
    { day: 'S', hours: 8.5, isCritical: false },
    { day: 'D', hours: 0, isCritical: false },
  ];

  const goalHours = user.sleepGoalHours || 8;
  const maxChartHours = 10;
  const goalLineYPercent = ((maxChartHours - goalHours) / maxChartHours) * 100;
  const hasRecords = records && records.length > 0;

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">Métricas semanales</h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Barras por día, promedio de descanso y detección de días críticos
          </p>
        </div>
      </div>

      {hasRecords ? (
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          {/* Header & Week Picker */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#ececf1]">Métricas</h3>
              <p className="text-xs text-[#9a9aa5] mt-0.5">
                Seguimiento semanal de tu higiene del sueño
              </p>
            </div>

            {/* Week Selector */}
            <div className="flex items-center gap-2 bg-[#1c1c1f] border border-[#3a3a41] p-1 rounded-xl">
              <button
                onClick={() =>
                  setCurrentWeekIndex((prev) => Math.min(weeks.length - 1, prev + 1))
                }
                disabled={currentWeekIndex === weeks.length - 1}
                className="p-1.5 text-[#9a9aa5] hover:text-[#ececf1] disabled:opacity-30 disabled:hover:text-[#9a9aa5] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[#ececf1] px-2 min-w-[130px] text-center">
                {currentWeek.label}
              </span>
              <button
                onClick={() => setCurrentWeekIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentWeekIndex === 0}
                className="p-1.5 text-[#9a9aa5] hover:text-[#ececf1] disabled:opacity-30 disabled:hover:text-[#9a9aa5] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
              <span className="text-xs text-[#9a9aa5] block">Promedio semanal</span>
              <span className="text-2xl font-bold text-[#ececf1] font-mono mt-1 block">
                {currentWeek.avg}
              </span>
            </div>

            <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
              <span className="text-xs text-[#9a9aa5] block">Días críticos</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[#ef5b5b] font-mono">
                  {currentWeek.criticalCount}
                </span>
                <span className="text-[11px] text-[#ef5b5b]">esta semana</span>
              </div>
            </div>

            <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
              <span className="text-xs text-[#9a9aa5] block">Mejor noche</span>
              <span className="text-2xl font-bold text-[#1fb58a] font-mono mt-1 block">
                {currentWeek.best}
              </span>
            </div>

            <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
              <span className="text-xs text-[#9a9aa5] block">Peor noche</span>
              <span className="text-2xl font-bold text-[#ef5b5b] font-mono mt-1 block">
                {currentWeek.worst}
              </span>
            </div>
          </div>

          {/* Weekly Bar Chart Canvas */}
          <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="text-xs font-semibold text-[#9a9aa5] uppercase tracking-wider">
                Horas por día
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

            {/* Bars Area */}
            <div className="relative h-64 w-full flex items-end pt-6 pb-2">
              {/* Dashed Goal Line */}
              <div
                className="absolute left-0 right-0 border-b border-dashed border-[#e8b04b]/80 z-10 pointer-events-none flex items-center"
                style={{ top: `${goalLineYPercent}%` }}
              >
                <span className="text-[10px] text-[#e8b04b] bg-[#1c1c1f] px-1 rounded absolute -top-4 right-0 font-mono">
                  {goalHours} h
                </span>
              </div>

              {/* Bars container */}
              <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-6">
                {chartBars.map((bar, idx) => {
                  const heightPercent = (bar.hours / maxChartHours) * 100;
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    >
                      {/* Tooltip value */}
                      {bar.hours > 0 && (
                        <span className="text-[11px] font-mono text-[#9a9aa5] group-hover:text-white mb-2 transition-colors">
                          {bar.hours}
                        </span>
                      )}

                      {/* Bar Pill */}
                      {bar.hours > 0 ? (
                        <div
                          className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 group-hover:brightness-110 ${
                            bar.isCritical ? 'bg-[#ef5b5b]' : 'bg-[#1fb58a]'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      ) : (
                        <div className="w-full max-w-[48px] h-1 bg-[#3a3a41] rounded-full" />
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
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-12 text-center max-w-xl mx-auto my-8 space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#1c1c1f] border border-[#3a3a41] flex items-center justify-center text-[#9a9aa5] mx-auto">
            <BarChart3 className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h4 className="text-xl font-bold text-[#ececf1]">Sin registros esta semana</h4>
          <p className="text-xs text-[#9a9aa5]">
            Empieza registrando tu sueño para visualizar tus métricas semanales y detectar días críticos.
          </p>
          <button
            onClick={() => setCurrentView('registrar')}
            className="px-5 py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md mt-2 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Registrar mi sueño</span>
          </button>
        </div>
      )}
    </div>
  );
};
