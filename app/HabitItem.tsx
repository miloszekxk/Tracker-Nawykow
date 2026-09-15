'use client'

import { useState } from 'react'
import { updateHabit, deleteHabit, markDone, removeDone } from './actions'
import { getLocalDateString } from '@/lib/date'
import { calculateStreak } from '@/lib/streak'

type Habit = {
    id: number
    name: string
    dates: string[]
}

export default function HabitItem({ habit }: { habit: Habit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(habit.name)

  // Liczone przy renderze w przeglądarce, żeby "dzisiaj" opierało się na
  // lokalnym czasie użytkownika, a nie na strefie czasowej serwera.
  const streak = calculateStreak(habit.dates)

  if(isEditing){
    return(
      <li className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border border-slate-700 bg-slate-900 rounded p-2 flex-1 min-w-0 outline-none focus:border-slate-500"/>
        <button onClick={() => {updateHabit(habit.id, name); setIsEditing(false)}} className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-3 py-1.5 rounded-md transition-colors">Zapisz</button>
      </li>
    )
  }

  return (
    <li className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div className="flex flex-col min-w-0 gap-1">
        <span className="font-medium truncate">{habit.name}</span>
        <span className="inline-flex w-fit items-center gap-1 text-xs text-slate-300 bg-slate-900/60 rounded-full px-2 py-0.5 whitespace-nowrap" suppressHydrationWarning>🔥 {streak} dni</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <button onClick={() => markDone(habit.id, getLocalDateString())} className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-3 py-1.5 rounded-md transition-colors">Odhacz dzisiaj</button>
        <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-slate-200 text-sm px-2 py-1.5 transition-colors">Edytuj</button>
        <button onClick={() => deleteHabit(habit.id)} className="text-red-400/70 hover:text-red-400 text-sm px-2 py-1.5 transition-colors">Usuń</button>
        <button onClick={() => removeDone(habit.id, getLocalDateString())} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">cofnij</button>
      </div>
    </li>
  )
}
