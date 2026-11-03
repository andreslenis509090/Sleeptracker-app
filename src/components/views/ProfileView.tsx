import React, { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  AlertTriangle,
  Lock,
  LogOut,
  Pencil,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import { useSleep } from '../../context/SleepContext';

export const ProfileView: React.FC = () => {
  const { user, updateUser, resetAllData, setCurrentView } = useSleep();

  // Modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editLastName, setEditLastName] = useState(user.lastName);
  const [editOccupation, setEditOccupation] = useState(user.occupation);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleUpdateGoal = (delta: number) => {
    const newGoal = Math.max(4, Math.min(12, user.sleepGoalHours + delta));
    updateUser({ sleepGoalHours: newGoal });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName,
      lastName: editLastName,
      occupation: editOccupation,
      email: editEmail,
    });
    setEditProfileOpen(false);
  };

  const handleConfirmDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmPassword) {
      setDeleteError('Por favor ingresa tu contraseña para confirmar');
      return;
    }
    resetAllData();
    setDeleteModalOpen(false);
    setCurrentView('login');
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">Perfil y cuenta</h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Datos personales, meta de descanso y configuración de cuenta
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-[#ececf1]">Perfil</h3>
          <p className="text-xs text-[#9a9aa5]">Gestiona tu cuenta</p>
        </div>

        {/* User Card matching PDF Page 8 */}
        <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1c1c1f] border border-[#1fb58a]/40 text-[#1fb58a] font-bold text-xl flex items-center justify-center shadow-inner">
              AL
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#ececf1]">
                {user.name} {user.lastName}
              </h4>
              <p className="text-xs text-[#9a9aa5] mt-0.5">
                {user.occupation} · {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditProfileOpen(true)}
            className="px-4 py-2 bg-[#1c1c1f] hover:bg-[#2c2c31] border border-[#3a3a41] text-[#ececf1] font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-[#1fb58a]" />
            <span>Editar perfil</span>
          </button>
        </div>

        {/* Settings rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meta de sueño */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 flex items-center justify-between shadow-md">
            <div>
              <span className="text-xs text-[#9a9aa5] block">Meta de sueño</span>
              <span className="text-lg font-bold text-[#ececf1] font-mono tabular-nums">
                {user.sleepGoalHours} horas por noche
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#1c1c1f] border border-[#3a3a41] p-1 rounded-xl">
              <button
                onClick={() => handleUpdateGoal(-1)}
                className="w-7 h-7 rounded-lg bg-[#252529] hover:bg-[#323238] flex items-center justify-center text-[#ececf1] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleUpdateGoal(1)}
                className="w-7 h-7 rounded-lg bg-[#252529] hover:bg-[#323238] flex items-center justify-center text-[#ececf1] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recordatorios */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 flex items-center justify-between shadow-md">
            <div>
              <span className="text-xs text-[#9a9aa5] block">Recordatorios</span>
              <span className="text-sm font-semibold text-[#ececf1]">
                Notificaciones de higiene del sueño
              </span>
            </div>

            <button
              onClick={() => setCurrentView('alertas')}
              className="text-xs text-[#1fb58a] hover:underline cursor-pointer font-medium"
            >
              Configurar alertas
            </button>
          </div>
        </div>

        {/* Danger Zone (Exact representation from PDF Page 8) */}
        <div className="bg-[#252529] border border-[#ef5b5b]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-[#ef5b5b]">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="text-base font-bold">Zona de peligro</h4>
          </div>

          <p className="text-xs text-[#9a9aa5] leading-relaxed">
            Eliminar tu cuenta borra también todos tus registros, métricas y alertas.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="text-xs font-semibold text-[#ef5b5b] hover:text-[#ff7878] hover:underline cursor-pointer"
            >
              Eliminar mi cuenta
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="px-4 py-2 bg-[#1c1c1f] hover:bg-[#2c2c31] border border-[#3a3a41] text-[#9a9aa5] hover:text-[#ececf1] font-medium text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: ¿Eliminar tu cuenta? (Exact match to center modal on Page 8) */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="w-10 h-10 rounded-xl bg-[#ef5b5b]/15 border border-[#ef5b5b]/40 flex items-center justify-center text-[#ef5b5b]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#ececf1] mb-2">
                ¿Eliminar tu cuenta?
              </h4>
              <p className="text-xs text-[#9a9aa5] leading-relaxed">
                Se eliminarán de forma permanente tu perfil y todos los datos asociados.
              </p>
            </div>

            <form onSubmit={handleConfirmDeleteAccount} className="space-y-4">
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-2">
                  Escribe tu contraseña para confirmar
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#ef5b5b] rounded-xl px-4 py-2.5 text-sm text-[#ececf1] outline-none"
                  />
                  <Lock className="w-4 h-4 text-[#6b6b76] absolute right-3.5 top-3" />
                </div>
                {deleteError && (
                  <p className="text-xs text-[#ef5b5b] mt-1.5">{deleteError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#ef5b5b] hover:bg-[#d94848] rounded-xl cursor-pointer shadow-md transition-colors"
                >
                  Eliminar cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar Perfil */}
      {editProfileOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4 animate-scale-up">
            <h4 className="text-xl font-bold text-[#ececf1]">Editar Perfil</h4>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#9a9aa5] mb-1">Nombre</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9a9aa5] mb-1">Apellido</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1">Ocupación</label>
                <input
                  type="text"
                  value={editOccupation}
                  onChange={(e) => setEditOccupation(e.target.value)}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1">Correo</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-black bg-[#1fb58a] hover:bg-[#199d77] rounded-xl cursor-pointer shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
