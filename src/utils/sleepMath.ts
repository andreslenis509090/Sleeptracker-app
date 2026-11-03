/**
 * Sleep math utilities for time difference, duration formatting, and critical day detection
 */

export function parse12HourTime(timeStr: string): { hours: number; minutes: number } | null {
  if (!timeStr) return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

  if (period === 'AM') {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return { hours, minutes };
}

export function calculateSleepDuration(bedtimeStr: string, wakeTimeStr: string): {
  totalMinutes: number;
  hours: number;
  minutes: number;
  formatted: string;
  crossesMidnight: boolean;
  decimalHours: number;
} | null {
  const bed = parse12HourTime(bedtimeStr);
  const wake = parse12HourTime(wakeTimeStr);

  if (!bed || !wake) return null;

  const bedTotalMinutes = bed.hours * 60 + bed.minutes;
  const wakeTotalMinutes = wake.hours * 60 + wake.minutes;

  let diffMinutes = wakeTotalMinutes - bedTotalMinutes;
  let crossesMidnight = false;

  if (diffMinutes <= 0) {
    diffMinutes += 24 * 60; // Crosses midnight into next day
    crossesMidnight = true;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const decimalHours = Number((diffMinutes / 60).toFixed(1));

  return {
    totalMinutes: diffMinutes,
    hours,
    minutes,
    formatted: `${hours} h ${minutes > 0 ? `${minutes} m` : '00 m'}`,
    crossesMidnight,
    decimalHours,
  };
}

export function getGoalComparison(durationMinutes: number, goalHours: number): string {
  const goalMinutes = goalHours * 60;
  const diff = goalMinutes - durationMinutes;

  if (diff > 0) {
    const diffHours = Math.floor(diff / 60);
    const diffMins = diff % 60;
    if (diffHours > 0) {
      return `Te faltaron ${diffHours} h ${diffMins} min para tu meta de ${goalHours} h.`;
    }
    return `Te faltaron ${diffMins} min para tu meta de ${goalHours} h.`;
  } else if (diff === 0) {
    return `¡Cumpliste exactamente tu meta de ${goalHours} h!`;
  } else {
    const excess = Math.abs(diff);
    const excessHours = Math.floor(excess / 60);
    const excessMins = excess % 60;
    if (excessHours > 0) {
      return `¡Superaste tu meta por ${excessHours} h ${excessMins} min!`;
    }
    return `¡Superaste tu meta por ${excessMins} min!`;
  }
}

export function isCriticalSleep(durationMinutes: number, goalHours: number): boolean {
  // A day is critical if < 6 hours or noticeably below personal goal
  const hours = durationMinutes / 60;
  return hours < 6 || hours < goalHours - 0.7;
}
