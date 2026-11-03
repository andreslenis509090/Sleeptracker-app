import React, { useState } from 'react';
import {
  Shield,
  FileSpreadsheet,
  Trash2,
  Lock,
  Download,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Database,
  Users,
  Moon,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { useSleep } from '../../context/SleepContext';
import { AdminRecord } from '../../types';

export const AdminView: React.FC = () => {
  const { adminRecords, deleteAdminRecord, setCurrentView } = useSleep();

  // Authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [adminEmail, setAdminEmail] = useState('admin@sistema.com');
  const [adminPass, setAdminPass] = useState('admin123');
  const [showLoginError, setShowLoginError] = useState(false);

  // Active admin section
  const [activeTab, setActiveTab] = useState<'reportes' | 'depurar' | 'respaldos' | 'auditoria'>('reportes');

  // Deletion modal state
  const [recordToDelete, setRecordToDelete] = useState<AdminRecord | null>(null);

  // Date range
  const [dateRange, setDateRange] = useState('1 oct – 24 oct 2026');
  const [exportNotice, setExportNotice] = useState(false);

  // Weekly counts for chart
  const weeklyData = [
    { week: 'S1', count: 42 },
    { week: 'S2', count: 60 },
    { week: 'S3', count: 38 },
    { week: 'S4', count: 70 },
  ];
  const maxWeekly = 80;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@sistema.com' && adminPass === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowLoginError(false);
    } else {
      setShowLoginError(true);
    }
  };

  const confirmDeleteRecord = () => {
    if (recordToDelete) {
      deleteAdminRecord(recordToDelete.id);
      setRecordToDelete(null);
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      version: '1.0.0',
      encryption: 'AES-256',
      system: 'SleepHygiene Admin Service',
      recordsCount: 1942,
      activeUsers: 128,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sleephygiene-backup-24oct2026.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3a3a41]/60">
        <div>
          <h2 className="text-xl font-bold text-[#ececf1]">Consola administrativa</h2>
          <p className="text-xs text-[#9a9aa5] mt-1">
            Reportes de actividad, depuración de registros y respaldos cifrados
          </p>
        </div>

        <button
          onClick={() => setCurrentView('inicio')}
          className="text-xs font-semibold text-[#ececf1] bg-[#252529] hover:bg-[#323238] border border-[#3a3a41] px-3.5 py-2 rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <span>← Volver a la aplicación</span>
        </button>
      </div>

      {!isAdminLoggedIn ? (
        /* ============ ADMIN LOGIN VIEW (Page 9 Right) ============ */
        <div className="max-w-md mx-auto my-12 bg-[#252529] border border-[#3a3a41] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-xl bg-[#1fb58a]/15 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] mx-auto">
            <Shield className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-[#ececf1]">Acceso administrador</h3>
            <p className="text-xs text-[#9a9aa5]">Consola de gestión y control</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#9a9aa5] mb-1.5">Correo</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-4 py-2.5 text-sm text-[#ececf1] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9a9aa5] mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  required
                  className="w-full bg-[#1c1c1f] border border-[#3a3a41] focus:border-[#1fb58a] rounded-xl px-4 py-2.5 text-sm text-[#ececf1] outline-none"
                />
                <Lock className="w-4 h-4 text-[#6b6b76] absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Error simulation banner matching Page 9 */}
            {showLoginError && (
              <div className="p-3 bg-[#ef5b5b]/10 border border-[#ef5b5b] rounded-xl text-xs text-[#ef5b5b] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Credenciales incorrectas</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-md"
            >
              Ingresar
            </button>

            <p className="text-[11px] text-[#9a9aa5] text-center">
              Los intentos fallidos quedan registrados.
            </p>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setCurrentView('inicio')}
                className="text-xs text-[#9a9aa5] hover:text-[#1fb58a] transition-colors cursor-pointer"
              >
                ← Volver a la aplicación
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ============ ADMIN DASHBOARD VIEW (Page 9 Left) ============ */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Sidebar */}
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2 py-1 text-sm font-bold text-[#ececf1]">
                <Shield className="w-4 h-4 text-[#1fb58a]" />
                <span>Admin</span>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'reportes' as const, label: 'Reportes', icon: FileSpreadsheet },
                  { id: 'depurar' as const, label: 'Depurar registros', icon: Trash2 },
                  { id: 'respaldos' as const, label: 'Respaldos', icon: Database },
                  { id: 'auditoria' as const, label: 'Auditoría', icon: Shield },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1c1c1f] text-[#1fb58a] border border-[#3a3a41]'
                          : 'text-[#9a9aa5] hover:text-[#ececf1] hover:bg-[#1c1c1f]/40'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                setIsAdminLoggedIn(false);
                setCurrentView('inicio');
              }}
              className="mt-6 flex items-center gap-2 px-3 py-2 text-xs text-[#9a9aa5] hover:text-[#ef5b5b] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir de admin</span>
            </button>
          </div>

          {/* Admin Main Body */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header: Reporte de actividad */}
            <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#ececf1]">
                    Reporte de actividad
                  </h3>
                  <p className="text-xs text-[#9a9aa5] mt-0.5">
                    Selecciona un rango de fechas
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#1c1c1f] border border-[#3a3a41] px-3 py-2 rounded-xl text-xs text-[#ececf1] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#9a9aa5]" />
                    <input
                      type="text"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-36 font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setExportNotice(true);
                      setTimeout(() => setExportNotice(false), 2000);
                    }}
                    className="px-4 py-2 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow"
                  >
                    Generar
                  </button>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
                  <span className="text-xs text-[#9a9aa5] block mb-1">
                    Usuarios activos
                  </span>
                  <span className="text-3xl font-bold text-[#ececf1] font-mono tabular-nums">
                    128
                  </span>
                </div>

                <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
                  <span className="text-xs text-[#9a9aa5] block mb-1">
                    Registros de sueño
                  </span>
                  <span className="text-3xl font-bold text-[#ececf1] font-mono tabular-nums">
                    1,942
                  </span>
                </div>

                <div className="bg-[#1c1c1f] border border-[#3a3a41] rounded-xl p-4">
                  <span className="text-xs text-[#9a9aa5] block mb-1">
                    Promedio global
                  </span>
                  <span className="text-3xl font-bold text-[#ececf1] font-mono tabular-nums">
                    7.1 h
                  </span>
                </div>
              </div>

              {/* Bar Chart: REGISTROS POR SEMANA */}
              <div className="pt-2">
                <span className="text-xs font-bold tracking-wider text-[#9a9aa5] uppercase block mb-4">
                  REGISTROS POR SEMANA
                </span>

                <div className="h-44 w-full flex items-end justify-between gap-4 px-4 bg-[#1c1c1f] border border-[#3a3a41] rounded-xl pt-6 pb-3">
                  {weeklyData.map((item) => {
                    const heightPercent = (item.count / maxWeekly) * 100;
                    return (
                      <div
                        key={item.week}
                        className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                      >
                        <span className="text-xs font-mono text-[#9a9aa5] group-hover:text-white mb-2 transition-colors">
                          {item.count}
                        </span>
                        <div
                          className="w-full max-w-[64px] bg-[#1fb58a] rounded-t-lg transition-all duration-300 group-hover:brightness-110"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-xs font-semibold text-[#9a9aa5] mt-2 group-hover:text-[#ececf1]">
                          {item.week}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Moderation / Data Debugging Table matching Page 9 */}
            <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-[#3a3a41]/70 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#ececf1]">
                    Depuración y Auditoría de Registros
                  </h4>
                  <p className="text-xs text-[#9a9aa5]">
                    Registros con posible anomalía o error de captura
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#ececf1]">
                  <thead className="bg-[#1e1e22] text-[#9a9aa5] uppercase tracking-wider font-semibold border-b border-[#3a3a41]">
                    <tr>
                      <th className="px-6 py-3">Usuario</th>
                      <th className="px-6 py-3">Fecha</th>
                      <th className="px-6 py-3">Duración</th>
                      <th className="px-6 py-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a3a41]/60">
                    {adminRecords.map((item) => (
                      <tr key={item.id} className="hover:bg-[#2c2c31]/60 transition-colors">
                        <td className="px-6 py-3.5 font-mono text-[#ececf1]">
                          {item.username}
                        </td>
                        <td className="px-6 py-3.5 text-[#9a9aa5]">{item.date}</td>
                        <td className="px-6 py-3.5 font-mono">
                          <span
                            className={
                              item.hasError ? 'text-[#ef5b5b] font-semibold' : ''
                            }
                          >
                            {item.duration}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <button
                            onClick={() => setRecordToDelete(item)}
                            className="p-1.5 text-[#ef5b5b] hover:bg-[#ef5b5b]/10 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar de BD y registrar en auditoría"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Respaldo cifrado de datos (Page 9 Bottom Card) */}
            <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c1c1f] border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#ececf1]">
                    Respaldo cifrado de datos
                  </h4>
                  <p className="text-xs text-[#9a9aa5]">
                    Último respaldo: 20 oct 2026
                  </p>
                </div>
              </div>

              <button
                onClick={handleExportBackup}
                className="px-4 py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar respaldo</span>
              </button>
            </div>

            {exportNotice && (
              <div className="p-3 bg-[#1fb58a]/15 border border-[#1fb58a]/40 rounded-xl text-xs text-[#1fb58a] flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                <span>¡Operación completada con éxito y registrada en auditoría!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ¿Eliminar este registro? (Depuración Admin, Page 9) */}
      {recordToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#252529] border border-[#3a3a41] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="w-10 h-10 rounded-xl bg-[#ef5b5b]/15 border border-[#ef5b5b]/40 flex items-center justify-center text-[#ef5b5b]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#ececf1] mb-2">
                ¿Eliminar este registro?
              </h4>
              <p className="text-xs text-[#9a9aa5] leading-relaxed">
                Se borrará de la base de datos y quedará en el archivo de auditoría.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                className="px-5 py-2.5 text-xs font-semibold text-[#9a9aa5] hover:text-[#ececf1] bg-[#1c1c1f] rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteRecord}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#ef5b5b] hover:bg-[#d94848] rounded-xl cursor-pointer shadow-md transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
