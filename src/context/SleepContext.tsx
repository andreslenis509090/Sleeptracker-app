import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SleepRecord, SleepAlert, AdminRecord, AppView } from '../types';
import { INITIAL_USER, INITIAL_RECORDS, INITIAL_ALERTS, INITIAL_ADMIN_RECORDS } from '../data/initialData';
import { calculateSleepDuration, isCriticalSleep } from '../utils/sleepMath';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
}

interface SleepContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  records: SleepRecord[];
  addRecord: (record: Omit<SleepRecord, 'id' | 'durationFormatted' | 'durationHours' | 'isCritical'>) => { success: boolean; isDuplicate?: boolean; existingRecord?: SleepRecord };
  updateRecord: (id: string, updates: Partial<SleepRecord>) => void;
  deleteRecord: (id: string) => void;
  getRecordByDate: (dateStr: string) => SleepRecord | undefined;
  alerts: SleepAlert[];
  masterAlertsEnabled: boolean;
  setMasterAlertsEnabled: (enabled: boolean) => void;
  toggleAlert: (id: string) => void;
  addAlert: (alert: Omit<SleepAlert, 'id'>) => { success: boolean; duplicateError?: string };
  deleteAlert: (id: string) => void;
  adminRecords: AdminRecord[];
  deleteAdminRecord: (id: string) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  toast: ToastNotification | null;
  showToast: (title: string, message: string) => void;
  dismissToast: () => void;
  resetAllData: () => void;
}

const SleepContext = createContext<SleepContextType | undefined>(undefined);

export const SleepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sh_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [records, setRecords] = useState<SleepRecord[]>(() => {
    const saved = localStorage.getItem('sh_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });

  const [alerts, setAlerts] = useState<SleepAlert[]>(() => {
    const saved = localStorage.getItem('sh_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [masterAlertsEnabled, setMasterAlertsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('sh_master_alerts');
    return saved ? JSON.parse(saved) : true;
  });

  const [adminRecords, setAdminRecords] = useState<AdminRecord[]>(() => {
    const saved = localStorage.getItem('sh_admin_records');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_RECORDS;
  });

  const [currentView, setCurrentView] = useState<AppView>('inicio');
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    localStorage.setItem('sh_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sh_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('sh_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('sh_master_alerts', JSON.stringify(masterAlertsEnabled));
  }, [masterAlertsEnabled]);

  useEffect(() => {
    localStorage.setItem('sh_admin_records', JSON.stringify(adminRecords));
  }, [adminRecords]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const getRecordByDate = (dateStr: string) => {
    return records.find((r) => r.dateStr === dateStr);
  };

  const addRecord = (
    data: Omit<SleepRecord, 'id' | 'durationFormatted' | 'durationHours' | 'isCritical'>
  ) => {
    const existing = getRecordByDate(data.dateStr);
    if (existing) {
      return { success: false, isDuplicate: true, existingRecord: existing };
    }

    const calc = calculateSleepDuration(data.bedtime, data.wakeTime);
    const durationMinutes = calc ? calc.totalMinutes : data.durationMinutes;
    const durationHours = calc ? calc.decimalHours : Number((durationMinutes / 60).toFixed(1));
    const durationFormatted = calc ? calc.formatted : `${Math.floor(durationMinutes / 60)} h ${durationMinutes % 60} m`;
    const isCritical = isCriticalSleep(durationMinutes, user.sleepGoalHours);

    const newRecord: SleepRecord = {
      ...data,
      id: `rec-${Date.now()}`,
      durationMinutes,
      durationHours,
      durationFormatted,
      isCritical,
    };

    setRecords((prev) => [newRecord, ...prev]);
    return { success: true };
  };

  const updateRecord = (id: string, updates: Partial<SleepRecord>) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const merged = { ...r, ...updates };
        if (updates.bedtime || updates.wakeTime) {
          const calc = calculateSleepDuration(merged.bedtime, merged.wakeTime);
          if (calc) {
            merged.durationMinutes = calc.totalMinutes;
            merged.durationHours = calc.decimalHours;
            merged.durationFormatted = calc.formatted;
            merged.isCritical = isCriticalSleep(calc.totalMinutes, user.sleepGoalHours);
          }
        }
        return merged;
      })
    );
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const addAlert = (data: Omit<SleepAlert, 'id'>) => {
    // Check duplicate type and time
    const exists = alerts.some(
      (a) => a.type === data.type && a.time.toLowerCase() === data.time.toLowerCase()
    );
    if (exists) {
      return {
        success: false,
        duplicateError: `Ya tienes una alerta de ${data.type.toLowerCase()} a las ${data.time}.`,
      };
    }

    const newAlert: SleepAlert = {
      ...data,
      id: `alert-${Date.now()}`,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    return { success: true };
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteAdminRecord = (id: string) => {
    setAdminRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const showToast = (title: string, message: string) => {
    setToast({
      id: `toast-${Date.now()}`,
      title,
      message,
      timeAgo: 'ahora',
    });
  };

  const dismissToast = () => {
    setToast(null);
  };

  const resetAllData = () => {
    setUser(INITIAL_USER);
    setRecords(INITIAL_RECORDS);
    setAlerts(INITIAL_ALERTS);
    setMasterAlertsEnabled(true);
    setAdminRecords(INITIAL_ADMIN_RECORDS);
    localStorage.clear();
  };

  return (
    <SleepContext.Provider
      value={{
        user,
        updateUser,
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        getRecordByDate,
        alerts,
        masterAlertsEnabled,
        setMasterAlertsEnabled,
        toggleAlert,
        addAlert,
        deleteAlert,
        adminRecords,
        deleteAdminRecord,
        currentView,
        setCurrentView,
        toast,
        showToast,
        dismissToast,
        resetAllData,
      }}
    >
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => {
  const context = useContext(SleepContext);
  if (!context) {
    throw new Error('useSleep must be used within a SleepProvider');
  }
  return context;
};
