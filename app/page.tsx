import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: habits } = await supabase.from('habits').select()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Moje nawyki</h1>
      <ul className="space-y-2">
        {habits?.map((habit) => (
          <li key={habit.id} className="border p-3 rounded">
            {habit.name} — seria: {habit.streak} dni
          </li>
        ))}
      </ul>
    </main>
  )
}