import React from 'react';
import { Moon, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DESIGN_SYSTEM } from '../../data/initialData';
import { useSleep } from '../../context/SleepContext';
import { downloadProjectZip } from '../../utils/zipGenerator';

export const OverviewPresentationView: React.FC = () => {
  const { setCurrentView } = useSleep();

  return (
    <div className="flex-1 p-6 md:p-12 flex flex-col justify-center max-w-6xl mx-auto w-full">
      {/* Brand Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#1fb58a]/15 border border-[#1fb58a]/40 flex items-center justify-center text-[#1fb58a] mb-8 shadow-inner">
        <Moon className="w-9 h-9 fill-[#1fb58a]" />
      </div>

      {/* Main Title */}
      <div className="space-y-4 mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#ececf1] tracking-tight leading-tight">
          Sistema de Monitoreo <br />
          <span className="text-[#ececf1]">de Higiene del Sueño</span>
        </h1>
        <p className="text-lg md:text-xl text-[#9a9aa5]">
          Diseño de interfaz · Versión web de escritorio · Basado en el Informe #3
        </p>
        <p className="text-sm font-medium text-[#1fb58a] flex items-center gap-2">
          <span>Andrés Felipe Lenis Cholo</span>
          <span className="text-[#6b6b76]">·</span>
          <span>Juan Pablo Deossa Yepes</span>
        </p>
      </div>

      {/* Palette Swatches (Direct representation of Page 1) */}
      <div className="mb-12">
        <h3 className="text-xs font-semibold tracking-wider text-[#9a9aa5] uppercase mb-4">
          Paleta de Color Oficial (Sistema de Diseño)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {DESIGN_SYSTEM.colors.map((color) => (
            <div
              key={color.hex}
              className="bg-[#252529] border border-[#3a3a41] rounded-xl p-3 flex flex-col gap-2 hover:border-[#1fb58a]/50 transition-colors"
            >
              <div
                className="w-full h-12 rounded-lg shadow-inner border border-white/5"
                style={{ backgroundColor: color.hex }}
              />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-[#ececf1] truncate">
                  {color.name}
                </p>
                <p className="text-[11px] font-mono text-[#9a9aa5] uppercase">
                  {color.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Navigation Grid to 02-09 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold tracking-wider text-[#9a9aa5] uppercase">
            Pantallas & Módulos Funcionales
          </h3>
          <span className="text-xs text-[#1fb58a]">
            Haz clic en cualquiera para navegar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {DESIGN_SYSTEM.modules.map((mod) => (
            <button
              key={mod.code}
              onClick={() => setCurrentView(mod.route)}
              className="bg-[#252529] hover:bg-[#2c2c32] border border-[#3a3a41] hover:border-[#1fb58a] p-3.5 rounded-xl text-left transition-all group flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-xs font-mono text-[#1fb58a] font-bold">
                  {mod.code}
                </span>
                <p className="text-sm font-semibold text-[#ececf1] group-hover:text-white transition-colors">
                  {mod.name}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6b6b76] group-hover:text-[#1fb58a] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* ZIP Action Card */}
      <div className="mt-12 p-6 bg-[#252529] border border-[#1fb58a]/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1fb58a]" />
            <h4 className="text-sm font-bold text-[#ececf1]">
              Entrega Completa de Código Fuente (.ZIP)
            </h4>
          </div>
          <p className="text-xs text-[#9a9aa5]">
            Incluye todos los archivos, componentes, estilos Tailwind, configuración Vite y README listo para <code className="text-[#ececf1] bg-[#1c1c1f] px-1.5 py-0.5 rounded">npm install & npm run dev</code>.
          </p>
        </div>

        <button
          onClick={downloadProjectZip}
          className="w-full md:w-auto px-5 py-2.5 bg-[#1fb58a] hover:bg-[#199d77] text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Descargar .ZIP del Proyecto</span>
        </button>
      </div>
    </div>
  );
};
