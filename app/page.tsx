import { supabase } from '@/lib/supabase'
import { addHabit } from './actions'
import HabitItem from './HabitItem'

export default async function Home() {
  const { data: habits } = await supabase
    .from('habits')
    .select()
    .order('id', { ascending: true })

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Moje nawyki</h1>

      <form action={addHabit} className="flex gap-2 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Nazwa nawyku"
          required
          className="border rounded p-2 flex-1"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Dodaj
        </button>
      </form>

      {habits && habits.length > 0 ? (
        <ul className="space-y-2">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Brak nawyków. Dodaj pierwszy powyżej.</p>
      )}
    </main>
  )
}