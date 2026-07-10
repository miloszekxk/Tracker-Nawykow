'use client'

import { useState } from 'react'
import { updateHabit, deleteHabit } from './actions'

type Habit = {
    id: number
    name: string
    streak: number
}

export default function HabitItem({ habit }: { habit: Habit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(habit.name)

  if(isEditing){
    return(
      <li className='flex gap-2'>
        <input value={name} onChange={(e) => setName(e.target.value)} className='border rounded p-1 flex-1'/>
        <button onClick={() => {updateHabit(habit.id, name); setIsEditing(false)}} >Zapisz</button>
      </li>
    )
  }

  return (
    <li className='flex gap-2 items-center'>
      <span className='flex-1'>{habit.name}</span>
      <span>🔥 {habit.streak}</span>
      <button onClick={() => setIsEditing(true)}>Edytuj</button>
      <button onClick={() => deleteHabit(habit.id)}>Usuń</button>
    </li>
  )
}
