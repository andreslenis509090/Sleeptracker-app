export interface UserProfile {
  name: string;
  lastName: string;
  occupation: string;
  email: string;
  sleepGoalHours: number;
}

export interface SleepRecord {
  id: string;
  dateStr: string; // e.g. "2026-10-24"
  dateLabel: string; // e.g. "Vie 23 oct"
  bedtime: string; // e.g. "10:30 PM"
  wakeTime: string; // e.g. "06:15 AM"
  durationMinutes: number;
  durationFormatted: string; // e.g. "7 h 45 m"
  durationHours: number; // e.g. 7.75
  rating: number; // 1 to 5
  isCritical: boolean; // duration < 6h or significantly below goal
  notes?: string;
}

export interface SleepAlert {
  id: string;
  time: string; // e.g. "10:00 PM"
  daysLabel: string; // e.g. "Todos los días", "Lunes a viernes"
  type: 'Dormir' | 'Despertar';
  enabled: boolean;
}

export interface AdminRecord {
  id: string;
  username: string;
  date: string;
  duration: string;
  hasError?: boolean;
}

export type AppView = 
  | 'overview'
  | 'login'
  | 'registro'
  | 'inicio'
  | 'registrar'
  | 'historial'
  | 'metricas'
  | 'alertas'
  | 'perfil'
  | 'admin';
