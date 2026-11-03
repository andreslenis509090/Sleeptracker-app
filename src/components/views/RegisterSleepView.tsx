import React, { useState } from 'react';
import { Clock, Calendar, Check, AlertCircle, AlertTriangle } from 'lucide-react';
import { useSleep } from '../../context/SleepContext';
import { calculateSleepDuration, getGoalComparison } from '../../utils/sleepMath';

export const RegisterSleepView: React.FC = () => {
  const { user, addRecord, setCurrentView, showToast } = useSleep();

  // Form states
  const [dateStr, setDateStr] = useState('2026-10-24');
  const [dateLabel, setDateLabel] = useState('Hoy · 24 oct 2026');
  const [bedtime, setBedtime] = useState('11:15 PM');
  const [wakeTime, setWakeTime] = useState('07:00 AM');
  const [rating, setRating] = useState<number>(4);
  const [formError, setFormError] = useState<string>('');

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);

  // Dynamic calculations
  const calc = calculateSleepDuration(bedtime, wakeTime);
  const durationFormatted = calc ? calc.formatted : '7 h 45 m';
  const durationHours = calc ? calc.decimalHours : 7.75;
  const goalComparison = calc
    ? getGoalComparison(calc.totalMinutes, user.sleepGoalHours)
    : 'Te faltaron 15 min para tu meta de 8 h.';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!bedtime.trim()) {
      setFormError('La hora de acostarse es obligatoria');
      return;
    }

    if (!wakeTime.trim()) {
      setFormError('La hora de despertar es obligatoria');
      return;
    }

    const res = addRecord({
      dateStr,
      dateLabel,
      bedtime,
      wakeTime,
      durationMinutes: calc ? calc.totalMinutes : 465,
      rating,
    });

    if (res.isDuplicate) {
      setDuplicateModalOpen(true);
      return;
    }

    setShowSuccessToast(true);
    showToast(
      '¡Registro guardado!',
      `Dormiste ${durationFormatted} · calificación ${rating}/5`
    );

    setTimeout(() => {
      setCurrentView('historial');
    }, 1200);
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">
            Registrar evento de sueño
          </h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Hora de acostarse y despertar (12 h AM/PM), calificación 1–5 y duración automática
          </p>
        </div>
      </div>

      {/* Main Grid Layout: Form on Left, Duration Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Form */}
        <div className="lg:col-span-2 bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#ececf1]">Registrar sueño</h3>
            <p className="text-xs text-[#9a9aa5] mt-1">Un solo registro por fecha</p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Fecha */}
            <div>
              <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                Fecha
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => {
                    setDateStr(e.target.value);
                    setDateLabel(e.target.value);
                  }}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-4 py-3 text-sm text-[#ececf1] outline-none transition-colors"
                />
                <Calendar className="w-4 h-4 text-[#9a9aa5] absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Horas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                  Hora de acostarse
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={bedtime}
                    placeholder="11:15 PM"
                    onChange={(e) => setBedtime(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-4 py-3 text-sm text-[#ececf1] outline-none transition-colors"
                  />
                  <Clock className="w-4 h-4 text-[#9a9aa5] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                  Hora de despertar
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-4 py-3 text-sm text-[#ececf1] outline-none"
                    placeholder="7:00 AM"
                  />
                  <Clock className="w-4 h-4 text-[#9a9aa5] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {formError && (
              <p className="text-xs text-[#ef5b5b] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </p>
            )}

            {/* Rating Selector 1 to 5 */}
            <div>
              <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                ¿Cómo te sientes al despertar?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((val) => {
                  const isSelected = rating === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'bg-[#1fb58a] text-black border-[#1fb58a] shadow-lg shadow-[#1fb58a]/20 scale-[1.02]'
                          : 'bg-[#1c1c1f] border-[#3a3a41] text-[#9a9aa5] hover:text-[#ececf1] hover:border-[#1fb58a]/50'
                      }`}
                    >
                      <span className="text-base font-bold">{val}</span>
                      <span className="text-[10px] font-normal">
                        {val === 1 && 'Muy mal'}
                        {val === 2 && 'Mal'}
                        {val === 3 && 'Regular'}
                        {val === 4 && 'Bien'}
                        {val === 5 && 'Excelente'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3a3a41]/60">
              <button
                type="button"
                onClick={() => setCurrentView('inicio')}
                className="px-5 py-2.5 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Guardar registro</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Duration & Goal Status Card */}
        <div className="space-y-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 shadow-xl space-y-5">
            <span className="text-xs text-[#9a9aa5] font-medium block">
              Duración calculada
            </span>

            <div>
              <span className="text-4xl font-extrabold text-[#ececf1] font-mono tracking-tight">
                {durationFormatted}
              </span>
              <p className="text-xs text-[#9a9aa5] mt-1">
                Meta personal: {user.sleepGoalHours} h
              </p>
            </div>

            <div className="pt-2 border-t border-[#3a3a41]/60">
              <span className="text-xs text-[#e8b04b] flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>{goalComparison}</span>
              </span>
            </div>
          </div>

          {/* Success Box notification */}
          {showSuccessToast && (
            <div className="p-4 bg-[#1fb58a]/15 border border-[#1fb58a] rounded-2xl flex items-center gap-3 animate-fade-in shadow-xl">
              <div className="w-8 h-8 rounded-xl bg-[#1fb58a] text-black flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#1fb58a]">
                  ¡Registro guardado!
                </h5>
                <p className="text-xs text-[#ececf1]">
                  Dormiste {durationFormatted} · calificación {rating}/5
                </p>
              </div>
            </div>
          )}

          {/* Estado Informativo de cruce de medianoche */}
          <div className="bg-[#252529]/60 border border-[#3a3a41]/70 rounded-2xl p-4 text-xs text-[#9a9aa5] space-y-1">
            <span className="font-semibold text-[#ececf1] block">
              Cálculo automático de sueño:
            </span>
            <p>
              El sistema calcula las horas de descanso incluso si la hora de acostarse (ej. 11:15 PM) cruza después de medianoche.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Registro ya existente */}
      {duplicateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scale-up">
            <span className="text-xs text-[#e8b04b] font-medium block">
              Ya existe un registro hoy
            </span>
            <h4 className="text-xl font-bold text-[#ececf1]">
              Solo se permite un registro por fecha
            </h4>
            <p className="text-xs text-[#9a9aa5] leading-relaxed">
              Tienes 7 h 45 m guardadas para hoy. ¿Quieres editarlas en lugar de crear un duplicado?
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setDuplicateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setDuplicateModalOpen(false);
                  setCurrentView('historial');
                }}
                className="px-4 py-2 text-xs font-semibold text-black bg-[#1fb58a] hover:bg-[#199d77] rounded-xl cursor-pointer"
              >
                Editar registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
