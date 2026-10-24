import { describe, expect, it } from 'vitest'
import { calculateStreak } from './streak'
import { getLocalDateString } from './date'

// Daty od podanego dnia wstecz: daysBack(now, 0, 1, 2) -> dziś, wczoraj, przedwczoraj
function daysBack(now: Date, ...offsets: number[]): string[] {
  return offsets.map((offset) =>
    getLocalDateString(new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset))
  )
}

const evening = new Date(2026, 9, 14, 21, 0) // 14.10.2026, 21:00

describe('calculateStreak', () => {
  it('zwraca 0 bez odhaczeń', () => {
    expect(calculateStreak([], evening)).toBe(0)
  })

  it('liczy serię kończącą się dzisiaj', () => {
    expect(calculateStreak(daysBack(evening, 0, 1, 2), evening)).toBe(3)
  })

  it('nie zeruje serii, gdy dziś nawyk nie jest jeszcze odhaczony', () => {
    expect(calculateStreak(daysBack(evening, 1, 2), evening)).toBe(2)
  })

  it('zeruje serię po pominiętym całym dniu', () => {
    expect(calculateStreak(daysBack(evening, 2, 3, 4), evening)).toBe(0)
  })

  it('zatrzymuje się na pierwszej przerwie', () => {
    expect(calculateStreak(daysBack(evening, 0, 1, 3, 4), evening)).toBe(2)
  })

  it('ignoruje kolejność i duplikaty dat', () => {
    const [today, yesterday, beforeYesterday] = daysBack(evening, 0, 1, 2)
    expect(calculateStreak([beforeYesterday, today, yesterday, today], evening)).toBe(3)
  })

  it('działa tuż po północy (w UTC to jeszcze poprzedni dzień)', () => {
    const afterMidnight = new Date(2026, 9, 15, 0, 30)
    expect(calculateStreak(daysBack(afterMidnight, 0, 1, 2), afterMidnight)).toBe(3)
  })

  it('działa przy przejściu na czas zimowy', () => {
    const afterChange = new Date(2026, 9, 26, 12, 0) // dzień po zmianie czasu 25.10
    expect(calculateStreak(daysBack(afterChange, 0, 1, 2, 3), afterChange)).toBe(4)
  })

  it('działa przy przejściu na czas letni', () => {
    const afterChange = new Date(2026, 2, 30, 12, 0) // dzień po zmianie czasu 29.03
    expect(calculateStreak(daysBack(afterChange, 0, 1, 2, 3), afterChange)).toBe(4)
  })
})
