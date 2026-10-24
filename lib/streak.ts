import { getLocalDateString } from './date'

// Liczy serię dni z rzędu na podstawie dat odhaczeń (YYYY-MM-DD, czas lokalny).
// Jeśli dziś nawyk nie jest jeszcze odhaczony, seria nadal trwa i liczy się
// od wczoraj - przerywa ją dopiero cały pominięty dzień.
export function calculateStreak(dates: string[], now: Date = new Date()): number {
  const done = new Set(dates)
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (!done.has(getLocalDateString(day))) {
    day.setDate(day.getDate() - 1)
  }

  let streak = 0
  while (done.has(getLocalDateString(day))) {
    streak++
    day.setDate(day.getDate() - 1)
  }

  return streak
}
