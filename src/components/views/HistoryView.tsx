import React, { useState } from 'react';
import { Pencil, Trash2, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { useSleep } from '../../context/SleepContext';
import { SleepRecord } from '../../types';

export const HistoryView: React.FC = () => {
  const { records, deleteRecord, updateRecord } = useSleep();

  // State for delete confirmation modal
  const [recordToDelete, setRecordToDelete] = useState<SleepRecord | null>(null);

  // State for edit modal
  const [editingRecord, setEditingRecord] = useState<SleepRecord | null>(null);
  const [editBedtime, setEditBedtime] = useState('');
  const [editWakeTime, setEditWakeTime] = useState('');

  const openDeleteModal = (record: SleepRecord) => {
    setRecordToDelete(record);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      deleteRecord(recordToDelete.id);
      setRecordToDelete(null);
    }
  };

  const openEditModal = (record: SleepRecord) => {
    setEditingRecord(record);
    setEditBedtime(record.bedtime);
    setEditWakeTime(record.wakeTime);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      updateRecord(editingRecord.id, {
        bedtime: editBedtime,
        wakeTime: editWakeTime,
      });
      setEditingRecord(null);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">Historial de registros</h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Consulta, edita y gestiona tus registros diarios de sueño
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-[#3a3a41]/70">
          <h3 className="text-2xl font-bold text-[#ececf1]">Historial</h3>
          <p className="text-xs text-[#9a9aa5] mt-0.5">Tus registros de sueño</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#ececf1]">
            <thead className="bg-[#1e1e22] text-xs text-[#9a9aa5] uppercase tracking-wider font-semibold border-b border-[#3a3a41]">
              <tr>
                <th className="px-6 py-3.5">Fecha</th>
                <th className="px-6 py-3.5">Horario</th>
                <th className="px-6 py-3.5">Duración</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a3a41]/60">
              {records.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-[#2c2c31]/60 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-[#ececf1] whitespace-nowrap">
                    {rec.dateLabel}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[#9a9aa5] whitespace-nowrap">
                    {rec.bedtime} → {rec.wakeTime}
                  </td>
                  <td className="px-6 py-4 font-mono font-medium whitespace-nowrap">
                    <span
                      className={
                        rec.isCritical ? 'text-[#ef5b5b]' : 'text-[#ececf1]'
                      }
                    >
                      {rec.durationFormatted}
                    </span>
                    {rec.isCritical && (
                      <span className="ml-2 text-[10px] text-[#ef5b5b] bg-[#ef5b5b]/10 border border-[#ef5b5b]/30 px-1.5 py-0.5 rounded">
                        Crítico
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(rec)}
                        className="p-1.5 text-[#9a9aa5] hover:text-[#1fb58a] hover:bg-[#1c1c1f] rounded-lg transition-colors cursor-pointer"
                        title="Editar registro"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => openDeleteModal(rec)}
                        className="p-1.5 text-[#9a9aa5] hover:text-[#ef5b5b] hover:bg-[#1c1c1f] rounded-lg transition-colors cursor-pointer"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[#9a9aa5]">
                    No hay registros de sueño disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ¿Eliminar este registro? (Exact match of PDF Page 5 Left) */}
      {recordToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="w-10 h-10 rounded-xl bg-[#ef5b5b]/15 border border-[#ef5b5b]/40 flex items-center justify-center text-[#ef5b5b]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#ececf1] mb-2">
                ¿Eliminar este registro?
              </h4>
              <p className="text-xs text-[#9a9aa5] leading-relaxed">
                Registro del {recordToDelete.dateLabel}. Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                className="px-5 py-2.5 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] hover:bg-[#2c2c31] border border-[#3a3a41] rounded-xl cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#ef5b5b] hover:bg-[#d94848] rounded-xl cursor-pointer shadow-md transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Editar registro */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scale-up">
            <div>
              <h4 className="text-lg font-bold text-[#ececf1]">
                Editar registro - {editingRecord.dateLabel}
              </h4>
              <p className="text-xs text-[#9a9aa5] mt-1">
                Ajusta las horas de acostarse y despertar.
              </p>
            </div>

            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1">
                  Hora de acostarse
                </label>
                <input
                  type="text"
                  value={editBedtime}
                  onChange={(e) => setEditBedtime(e.target.value)}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1">
                  Hora de despertar
                </label>
                <input
                  type="text"
                  value={editWakeTime}
                  onChange={(e) => setEditWakeTime(e.target.value)}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-black bg-[#1fb58a] hover:bg-[#199d77] rounded-xl cursor-pointer"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
