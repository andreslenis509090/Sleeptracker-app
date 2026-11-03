import { SleepRecord, SleepAlert, AdminRecord, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Andres',
  lastName: 'Lenis',
  occupation: 'Estudiante',
  email: 'andres@correo.com',
  sleepGoalHours: 8,
};

export const INITIAL_RECORDS: SleepRecord[] = [
  {
    id: 'rec-2026-10-24',
    dateStr: '2026-10-24',
    dateLabel: 'Sáb 24 oct',
    bedtime: '11:15 PM',
    wakeTime: '07:00 AM',
    durationMinutes: 465,
    durationFormatted: '7 h 45 m',
    durationHours: 7.75,
    rating: 4,
    isCritical: false,
  },
  {
    id: 'rec-2026-10-23',
    dateStr: '2026-10-23',
    dateLabel: 'Vie 23 oct',
    bedtime: '10:30 PM',
    wakeTime: '06:15 AM',
    durationMinutes: 465,
    durationFormatted: '7 h 45 m',
    durationHours: 7.75,
    rating: 4,
    isCritical: false,
  },
  {
    id: 'rec-2026-10-22',
    dateStr: '2026-10-22',
    dateLabel: 'Jue 22 oct',
    bedtime: '01:10 AM',
    wakeTime: '06:30 AM',
    durationMinutes: 320,
    durationFormatted: '5 h 20 m',
    durationHours: 5.33,
    rating: 2,
    isCritical: true,
  },
  {
    id: 'rec-2026-10-21',
    dateStr: '2026-10-21',
    dateLabel: 'Mié 21 oct',
    bedtime: '11:00 PM',
    wakeTime: '07:00 AM',
    durationMinutes: 480,
    durationFormatted: '8 h 00 m',
    durationHours: 8.0,
    rating: 5,
    isCritical: false,
  },
  {
    id: 'rec-2026-10-20',
    dateStr: '2026-10-20',
    dateLabel: 'Mar 20 oct',
    bedtime: '11:40 PM',
    wakeTime: '06:40 AM',
    durationMinutes: 420,
    durationFormatted: '7 h 00 m',
    durationHours: 7.0,
    rating: 3,
    isCritical: true, // below 7.5 / critical
  },
  {
    id: 'rec-2026-10-19',
    dateStr: '2026-10-19',
    dateLabel: 'Lun 19 oct',
    bedtime: '11:00 PM',
    wakeTime: '07:00 AM',
    durationMinutes: 480,
    durationFormatted: '8 h 00 m',
    durationHours: 8.0,
    rating: 4,
    isCritical: false,
  },
];

export const INITIAL_ALERTS: SleepAlert[] = [
  {
    id: 'alert-1',
    time: '10:00 PM',
    daysLabel: 'Todos los días',
    type: 'Dormir',
    enabled: true,
  },
  {
    id: 'alert-2',
    time: '6:30 AM',
    daysLabel: 'Lunes a viernes',
    type: 'Despertar',
    enabled: true,
  },
  {
    id: 'alert-3',
    time: '8:00 AM',
    daysLabel: 'Fines de semana',
    type: 'Despertar',
    enabled: false,
  },
];

export const INITIAL_ADMIN_RECORDS: AdminRecord[] = [
  {
    id: 'adm-1',
    username: 'a.lenis',
    date: '23 oct',
    duration: '7 h 45 m',
  },
  {
    id: 'adm-2',
    username: 'j.deossa',
    date: '23 oct',
    duration: '25 h 10 m (error)',
    hasError: true,
  },
  {
    id: 'adm-3',
    username: 'm.perez',
    date: '22 oct',
    duration: '6 h 20 m',
  },
];

export const DESIGN_SYSTEM = {
  colors: [
    { name: 'Fondo', hex: '#1c1c1f', desc: 'Lienzo principal de la app' },
    { name: 'Superficie', hex: '#252529', desc: 'Tarjetas, contenedores y barras' },
    { name: 'Borde', hex: '#3a3a41', desc: 'Separadores y líneas tenues' },
    { name: 'Texto', hex: '#ececf1', desc: 'Tipografía de alto contraste' },
    { name: 'Acento', hex: '#1fb58a', desc: 'Acciones principales y cumplimiento' },
    { name: 'Día crítico', hex: '#ef5b5b', desc: 'Alerta y sueño insuficiente' },
    { name: 'Meta', hex: '#e8b04b', desc: 'Línea de objetivo y valores clave' },
  ],
  modules: [
    { code: '02', name: 'Acceso y registro', route: 'login' as const, path: 'sleephygiene.app/login' },
    { code: '03', name: 'Inicio', route: 'inicio' as const, path: 'sleephygiene.app/inicio' },
    { code: '04', name: 'Registrar sueño', route: 'registrar' as const, path: 'sleephygiene.app/registrar' },
    { code: '05', name: 'Historial y edición', route: 'historial' as const, path: 'sleephygiene.app/historial' },
    { code: '06', name: 'Métricas semanales', route: 'metricas' as const, path: 'sleephygiene.app/metricas' },
    { code: '07', name: 'Alertas', route: 'alertas' as const, path: 'sleephygiene.app/alertas' },
    { code: '08', name: 'Perfil y cuenta', route: 'perfil' as const, path: 'sleephygiene.app/perfil' },
    { code: '09', name: 'Consola administrativa', route: 'admin' as const, path: 'sleephygiene.app/admin' },
  ]
};
