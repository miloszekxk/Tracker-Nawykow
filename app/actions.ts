'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addHabit(formData: FormData) {
  const name = formData.get('name') as string
  if (!name || name.trim() === '') return

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('habits').insert({ name: name.trim(), user_id: user.id })

  revalidatePath('/')
}

export async function deleteHabit(id: number) {
  const supabase = await createClient()

  await supabase.from('habits').delete().eq('id', id)

  revalidatePath('/')
}

export async function updateHabit(id: number, name: string) {
  const trimmed = name.trim()
  if (trimmed === '') return

  const supabase = await createClient()

  await supabase.from('habits').update({ name: trimmed }).eq('id', id)

  revalidatePath('/')
}

export async function markDone(habitId: number) {
  const supabase = await createClient()

  const today = new Date().toISOString().split('T')[0]
  const { error } = await supabase.from('completions').insert({ habit_id: habitId, date: today })
  if (error) {
    console.log('Już odchaczone dzisiaj lub inny błąd:', error.message)
    return
  }
  revalidatePath('/')
}

export async function removeDone(habitId: number) {
  const supabase = await createClient()

  const today = new Date().toISOString().split('T')[0]
  await supabase.from('completions').delete().eq('habit_id', habitId).eq('date', today)
  revalidatePath('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}