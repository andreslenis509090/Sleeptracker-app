import JSZip from 'jszip';

export async function downloadProjectZip(): Promise<void> {
  // First attempt to download the pre-packaged zip directly from public
  try {
    const res = await fetch('/sleephygiene-frontend.zip');
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sleephygiene-frontend.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
  } catch (err) {
    // Proceed to JSZip fallback
  }

  const zip = new JSZip();

  // Add .npmrc for flawless compatibility across all npm versions
  zip.file('.npmrc', 'legacy-peer-deps=true\nengine-strict=false\n');

  // 1. Root configuration files
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'sleephygiene-frontend',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite --port 3000 --host',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'lucide-react': '^0.475.0',
          motion: '^12.4.7',
          jszip: '^3.10.1',
        },
        devDependencies: {
          '@types/node': '^22.13.4',
          '@types/react': '^19.0.10',
          '@types/react-dom': '^19.0.4',
          '@types/jszip': '^3.4.1',
          '@vitejs/plugin-react': '^4.3.4',
          '@tailwindcss/vite': '^4.0.9',
          tailwindcss: '^4.0.9',
          typescript: '^5.7.3',
          vite: '^6.2.0',
        },
      },
      null,
      2
    )
  );

  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          useDefineForClassFields: false,
          module: 'ESNext',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          skipLibCheck: true,
          moduleResolution: 'bundler',
          isolatedModules: true,
          jsx: 'react-jsx',
          paths: { '@/*': ['./*'] },
          noEmit: true,
        },
        include: ['src'],
      },
      null,
      2
    )
  );

  zip.file(
    'vite.config.ts',
    `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
  },
});
`
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SleepHygiene - Sistema de Monitoreo de Higiene del Sueño</title>
    <meta name="description" content="Sistema de monitoreo de higiene del sueño para registro, métricas semanales, alertas personalizadas y consola administrativa." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#1c1c1f] text-[#ececf1] font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    'README.md',
    `# SleepHygiene - Sistema de Monitoreo de Higiene del Sueño
Diseño de interfaz · Versión web de escritorio · Basado en el Informe #3
Autores: Andrés Felipe Lenis Cholo & Juan Pablo Deossa Yepes

## Requisitos
- Node.js 18+ o superior
- npm 9+ o pnpm / yarn

## Pasos para ejecutar:
1. Extraer los archivos del .zip
2. Abrir la terminal en la carpeta extraída
3. Instalar las dependencias:
   \`\`\`bash
   npm install
   \`\`\`
4. Iniciar el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Abrir en el navegador:
   \`http://localhost:3000\`

## Módulos incluidos según diseño:
- 01 · Presentación y Sistema de Diseño (Paleta y Módulos)
- 02 · Acceso y registro (Login con sesión y Registro con meta)
- 03 · Inicio (Resumen semanal, KPIs, Gráfico de barras, Próxima alerta)
- 04 · Registrar evento de sueño (Cálculo automático de duración, cruce de medianoche, validaciones)
- 05 · Historial y edición (Tabla interactiva, prevención de duplicados, modal de eliminación)
- 06 · Métricas semanales (Navegación entre semanas, estados vacío y sin conexión)
- 07 · Alertas de higiene (Interruptor general, recordatorios de dormir/despertar, toast en vivo)
- 08 · Perfil y cuenta (Editar perfil, meta diaria, zona de peligro con confirmación de clave)
- 09 · Consola administrativa (Login admin, reportes de actividad, depuración con auditoría, exportar respaldo)
`
  );

  // We can fetch source code files currently in the applet
  const filesToFetch = [
    '/src/main.tsx',
    '/src/App.tsx',
    '/src/index.css',
    '/src/types/index.ts',
    '/src/data/initialData.ts',
    '/src/utils/sleepMath.ts',
    '/src/utils/zipGenerator.ts',
    '/src/context/SleepContext.tsx',
    '/src/components/layout/Sidebar.tsx',
    '/src/components/layout/BrowserFrame.tsx',
    '/src/components/views/OverviewPresentationView.tsx',
    '/src/components/views/LoginView.tsx',
    '/src/components/views/RegisterView.tsx',
    '/src/components/views/DashboardView.tsx',
    '/src/components/views/RegisterSleepView.tsx',
    '/src/components/views/HistoryView.tsx',
    '/src/components/views/MetricsView.tsx',
    '/src/components/views/AlertsView.tsx',
    '/src/components/views/ProfileView.tsx',
    '/src/components/views/AdminView.tsx',
  ];

  for (const filePath of filesToFetch) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const text = await response.text();
        const relativePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
        zip.file(relativePath, text);
      }
    } catch {
      // In case fetch is hindered by client-side router, handled gracefully
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'sleephygiene-frontend.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
