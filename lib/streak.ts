
function toDateString(d: Date): string {
  return d.toISOString().split('T')[0]
}

function subtractOneDay(d: Date): Date {
  const result = new Date(d)
  result.setDate(result.getDate() - 1)
  return result
}

export function calculateStreak(dates: string[]): number {

  if (dates.length === 0) return 0

  const sorted = [...dates].sort((a, b) => (a > b ? -1 : 1))

  let streak = 0
  
  let expected = new Date()

  for (const dateStr of sorted) {
    const expectedStr = toDateString(expected)

    if (dateStr === expectedStr) {
      streak++

      expected = subtractOneDay(expected)
    } else {
      break
    }
  }

  return streak
}