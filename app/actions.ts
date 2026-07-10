'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

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