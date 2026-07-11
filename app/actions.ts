'use server'

import { supabase } from '@/lib/supabase'
import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { Habibi } from 'next/font/google'

export async function addHabit(formData: FormData) {
  const name = formData.get('name') as string

  if (!name || name.trim() === '') return

  await supabase.from('habits').insert({ name: name.trim(), streak: 0 })

  revalidatePath('/')
}

export async function deleteHabit(id: number) {
  await supabase.from('habits').delete().eq('id', id)

  revalidatePath('/')
}

export async function updateHabit(id: number, name: string) {
  const trimmed = name.trim()
  if (trimmed === '') return

  await supabase.from('habits').update({ name: trimmed }).eq('id', id)

  revalidatePath('/')
}

export async function markDone(habitId: number) {
  const today = new Date().toISOString().split('T')[0]
  const { error } = await supabase.from('completions').insert({ habit_id: habitId, date: today })
  if (error) {
    console.log("Już odchaczone dzisiaj lub inny błąd:" , error.message)
    return
  }
  revalidatePath('/')

}

export async function removeDone(habitId: number) {
  const today = new Date().toISOString().split('T')[0]
  await supabase.from('completions').delete().eq('habit_id', habitId).eq('date', today)
  revalidatePath('/')
}

