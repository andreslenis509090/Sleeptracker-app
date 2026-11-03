import React, { useState } from 'react';
import { Moon, Lock, Mail, ChevronRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useSleep } from '../../context/SleepContext';

export const LoginView: React.FC = () => {
  const { user, updateUser, setCurrentView } = useSleep();

  // Tab switch between Login and Register
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('andres@correo.com');
  const [loginPass, setLoginPass] = useState('password123');
  const [loginMsg, setLoginMsg] = useState('');

  // Register form state
  const [regName, setRegName] = useState(user.name);
  const [regLastName, setRegLastName] = useState(user.lastName);
  const [regOccupation, setRegOccupation] = useState(user.occupation);
  const [regGoal, setRegGoal] = useState(user.sleepGoalHours || 8);
  const [regEmail, setRegEmail] = useState(user.email);
  const [regPass, setRegPass] = useState('password123');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMsg('Sesión iniciada con éxito');
    setTimeout(() => {
      setCurrentView('inicio');
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: regName,
      lastName: regLastName,
      occupation: regOccupation,
      sleepGoalHours: regGoal,
      email: regEmail,
    });
    setRegSuccess(true);
    setTimeout(() => {
      setCurrentView('inicio');
    }, 700);
  };

  return (
    <div className="flex-1 p-6 md:p-12 flex flex-col justify-center items-center">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#252529] p-1 rounded-xl border border-[#3a3a41] inline-flex">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-[#1fb58a] text-black shadow'
                : 'text-[#9a9aa5] hover:text-[#ececf1]'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-[#1fb58a] text-black shadow'
                : 'text-[#9a9aa5] hover:text-[#ececf1]'
            }`}
          >
            Crear cuenta
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-md w-full">
        {/* CARD 1: Iniciar Sesión */}
        {activeTab === 'login' && (
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1fb58a]/15 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] mb-6">
              <Moon className="w-6 h-6 fill-[#1fb58a]" />
            </div>

            <h3 className="text-2xl font-bold text-[#ececf1] mb-1">
              Bienvenido de nuevo
            </h3>
            <p className="text-xs text-[#9a9aa5] mb-6">
              Inicia sesión para continuar con tu registro de higiene del sueño.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                  <Mail className="w-4 h-4 text-[#6b6b76] absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-[#6b6b76] absolute right-3.5 top-3" />
                </div>
              </div>

              {loginMsg && (
                <div className="p-2.5 bg-[#1fb58a]/15 border border-[#1fb58a]/30 rounded-xl text-xs text-[#1fb58a] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loginMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-md mt-2"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="text-xs text-[#9a9aa5] hover:text-[#1fb58a] transition-colors cursor-pointer"
              >
                ¿No tienes cuenta? <span className="text-[#1fb58a] font-semibold underline">Regístrate</span>
              </button>
            </div>
          </div>
        )}

        {/* CARD 2: Crear cuenta */}
        {activeTab === 'register' && (
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#ececf1] mb-1">
              Crea tu cuenta
            </h3>
            <p className="text-xs text-[#9a9aa5] mb-6">
              Tu meta de sueño nos ayuda a detectar tus días críticos y optimizar tu descanso.
            </p>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#9a9aa5] mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                    placeholder="Andres"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9a9aa5] mb-1.5">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                    placeholder="Lenis"
                  />
                </div>
              </div>

              {/* Ocupación */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Ocupación
                </label>
                <div className="relative">
                  <select
                    value={regOccupation}
                    onChange={(e) => setRegOccupation(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2.5 text-sm text-[#ececf1] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Estudiante">Estudiante</option>
                    <option value="Ingeniero / Desarrollador">Ingeniero / Desarrollador</option>
                    <option value="Médico / Salud">Médico / Salud</option>
                    <option value="Docente">Docente</option>
                    <option value="Independiente">Independiente</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-[#9a9aa5] absolute right-3.5 top-3.5 pointer-events-none rotate-90" />
                </div>
              </div>

              {/* Meta de sueño Stepper */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Meta de sueño (horas por noche)
                </label>
                <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl px-4 py-2 flex items-center justify-between">
                  <span className="text-xs text-[#9a9aa5]">Meta diaria</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRegGoal(Math.max(4, regGoal - 1))}
                      className="w-7 h-7 rounded-lg bg-[#252529] hover:bg-[#323238] border border-[#3a3a41] flex items-center justify-center text-[#ececf1] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-[#1fb58a] min-w-[2.5rem] text-center">
                      {regGoal} h
                    </span>
                    <button
                      type="button"
                      onClick={() => setRegGoal(Math.min(12, regGoal + 1))}
                      className="w-7 h-7 rounded-lg bg-[#252529] hover:bg-[#323238] border border-[#3a3a41] flex items-center justify-center text-[#ececf1] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                  placeholder="andres@correo.com"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-xs text-[#9a9aa5] mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-3 py-2 text-sm text-[#ececf1] outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-[#6b6b76] absolute right-3.5 top-2.5" />
                </div>
              </div>

              {regSuccess && (
                <div className="p-2.5 bg-[#1fb58a]/15 border border-[#1fb58a]/30 rounded-xl text-xs text-[#1fb58a] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>¡Cuenta creada con éxito! Redirigiendo...</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-md mt-2"
              >
                Crear cuenta
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-xs text-[#9a9aa5] hover:text-[#1fb58a] transition-colors cursor-pointer"
              >
                ¿Ya tienes cuenta? <span className="text-[#1fb58a] font-semibold underline">Inicia sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
