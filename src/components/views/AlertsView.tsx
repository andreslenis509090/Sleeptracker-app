import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react';
import { useSleep } from '../../context/SleepContext';
import { SleepAlert } from '../../types';

export const AlertsView: React.FC = () => {
  const {
    alerts,
    masterAlertsEnabled,
    setMasterAlertsEnabled,
    toggleAlert,
    addAlert,
    deleteAlert,
    showToast,
  } = useSleep();

  // New alert form states
  const [alertType, setAlertType] = useState<'Dormir' | 'Despertar'>('Dormir');
  const [hour, setHour] = useState('10');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('PM');
  const [daysOption, setDaysOption] = useState('Todos los días');
  const [errorMessage, setErrorMessage] = useState('');

  const formattedTime = `${hour}:${minute} ${ampm}`;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = addAlert({
      time: formattedTime,
      type: alertType,
      daysLabel: daysOption,
      enabled: true,
    });

    if (!res.success) {
      setErrorMessage(res.duplicateError || 'Error al guardar alerta');
      return;
    }

    showToast('Alerta creada', `Alerta de ${alertType} programada a las ${formattedTime}`);
  };

  const handleTriggerLiveAlert = () => {
    showToast(
      'Hora de prepararte para dormir',
      'Desconéctate de las pantallas y relájate.'
    );
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">
            Alertas de higiene del sueño
          </h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Programa recordatorios para acostarte y despertar a tiempo
          </p>
        </div>
      </div>

      {/* Grid: Left Column Alarms List, Right Column New Alert & Toast Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Alarms List & Master Toggle */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-2xl font-bold text-[#ececf1]">Alertas</h3>
              <p className="text-xs text-[#9a9aa5]">Programa tus recordatorios</p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('new-alert-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Nueva alerta</span>
            </button>
          </div>

          {/* Master Switch Card (as in PDF) */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div>
              <h4 className="text-sm font-bold text-[#ececf1]">Recordatorios</h4>
              <p className="text-xs text-[#9a9aa5]">
                Interruptor general de notificaciones
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMasterAlertsEnabled(!masterAlertsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                masterAlertsEnabled ? 'bg-[#1fb58a]' : 'bg-[#3a3a41]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                  masterAlertsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Individual Alarms list */}
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex items-center justify-between shadow-md hover:border-[#3a3a41]/90 transition-all"
              >
                <div>
                  <div className="text-2xl font-bold text-[#ececf1] font-mono tabular-nums">
                    {alert.time}
                  </div>
                  <div className="text-xs text-[#9a9aa5] mt-0.5">
                    {alert.daysLabel}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Category Pill Tag */}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      alert.type === 'Dormir'
                        ? 'bg-[#1fb58a]/15 text-[#1fb58a] border border-[#1fb58a]/30'
                        : 'bg-[#e8b04b]/15 text-[#e8b04b] border border-[#e8b04b]/30'
                    }`}
                  >
                    {alert.type}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1.5 text-[#9a9aa5] hover:text-[#ef5b5b] transition-colors cursor-pointer"
                    title="Eliminar alerta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    disabled={!masterAlertsEnabled}
                    onClick={() => toggleAlert(alert.id)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer disabled:opacity-40 ${
                      alert.enabled && masterAlertsEnabled
                        ? 'bg-[#1fb58a]'
                        : 'bg-[#3a3a41]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                        alert.enabled && masterAlertsEnabled
                          ? 'translate-x-7'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form Nueva Alerta + Toast Notification */}
        <div id="new-alert-form" className="space-y-6">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 shadow-xl space-y-5">
            <h4 className="text-lg font-bold text-[#ececf1]">Nueva alerta</h4>

            <form onSubmit={handleCreateAlert} className="space-y-5">
              {/* Tipo: Dormir / Despertar segmented control */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                  Tipo
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#1c1c1f] p-1 rounded-xl border border-[#3a3a41]">
                  <button
                    type="button"
                    onClick={() => setAlertType('Dormir')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      alertType === 'Dormir'
                        ? 'bg-[#1fb58a] text-black shadow'
                        : 'text-[#9a9aa5] hover:text-[#ececf1]'
                    }`}
                  >
                    Dormir
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('Despertar')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      alertType === 'Despertar'
                        ? 'bg-[#1fb58a] text-black shadow'
                        : 'text-[#9a9aa5] hover:text-[#ececf1]'
                    }`}
                  >
                    Despertar
                  </button>
                </div>
              </div>

              {/* Digital Time Picker styled exactly like PDF Page 7 */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-2 font-medium">
                  Hora programada
                </label>
                <div className="flex items-center gap-2 bg-[#1c1c1f] border border-[#3a3a41] p-2.5 rounded-xl justify-center font-mono">
                  <input
                    type="text"
                    maxLength={2}
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="w-12 bg-[#252529] border border-[#3a3a41] focus:border-[#1fb58a] rounded-lg py-1.5 text-center text-xl font-bold text-[#1fb58a] outline-none"
                  />
                  <span className="text-lg font-bold text-[#9a9aa5]">:</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    className="w-12 bg-[#252529] border border-[#3a3a41] focus:border-[#1fb58a] rounded-lg py-1.5 text-center text-xl font-bold text-[#ececf1] outline-none"
                  />
                  <div className="flex rounded-lg overflow-hidden border border-[#3a3a41] ml-2">
                    <button
                      type="button"
                      onClick={() => setAmpm('AM')}
                      className={`px-2 py-1 text-xs font-bold transition-colors cursor-pointer ${
                        ampm === 'AM'
                          ? 'bg-[#1fb58a] text-black'
                          : 'bg-[#252529] text-[#9a9aa5]'
                      }`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmpm('PM')}
                      className={`px-2 py-1 text-xs font-bold transition-colors cursor-pointer ${
                        ampm === 'PM'
                          ? 'bg-[#1fb58a] text-black'
                          : 'bg-[#252529] text-[#9a9aa5]'
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              {/* Frecuencia */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1 font-medium">
                  Frecuencia
                </label>
                <select
                  value={daysOption}
                  onChange={(e) => setDaysOption(e.target.value)}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-xs text-[#ececf1] outline-none"
                >
                  <option value="Todos los días">Todos los días</option>
                  <option value="Lunes a viernes">Lunes a viernes</option>
                  <option value="Fines de semana">Fines de semana</option>
                </select>
              </div>

              {/* Duplicate Error Warning */}
              {errorMessage && (
                <div className="p-3 bg-[#ef5b5b]/10 border border-[#ef5b5b] rounded-xl text-xs text-[#ef5b5b] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Guardar alerta
                </button>
              </div>
            </form>
          </div>

          {/* Example preview of notification */}
          <div className="space-y-2">
            <div className="text-xs text-[#9a9aa5]">
              <span>Ejemplo de notificación en pantalla:</span>
            </div>

            <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-4 shadow-xl flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#1fb58a]/20 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] shrink-0 mt-0.5">
                <Moon className="w-4 h-4 fill-[#1fb58a]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-[#9a9aa5] flex items-center gap-1.5">
                  <span className="font-semibold text-[#ececf1]">SleepHygiene</span>
                  <span>·</span>
                  <span>ahora</span>
                </div>
                <h5 className="text-xs font-bold text-[#ececf1] mt-0.5">
                  Hora de prepararte para dormir
                </h5>
                <p className="text-[11px] text-[#9a9aa5] mt-0.5">
                  Desconéctate de las pantallas y relájate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
