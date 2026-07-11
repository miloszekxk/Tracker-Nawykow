import { supabase } from '@/lib/supabase'
import { addHabit } from './actions'
import HabitItem from './HabitItem'
import { calculateStreak } from '@/lib/streak'

export default async function Home() {
  const { data: habits } = await supabase
    .from('habits')
    .select()
    .order('id', { ascending: true })


  const { data: completions } = await supabase.from('completions').select()

  return (
   <main className="w-full max-w-md sm:max-w-lg mx-auto px-4 py-6 sm:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold mb-1">Moje nawyki</h1>
    <p className="text-slate-400 mb-6">Śledź swoje codzienne postępy</p>

      <form action={addHabit} className="flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Nazwa nawyku"
          required
          className="border border-slate-700 bg-slate-800 rounded-lg p-2 flex-1 min-w-0 outline-none focus:border-slate-500 transition-colors"
        />
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">
          Dodaj
        </button>
      </form>

      <ul className="space-y-5">
        {habits?.map((habit) => {
          const habitCompletions = completions?.filter(
            (c) => c.habit_id === habit.id
          )

          const dates = habitCompletions?.map((c) => c.date) ?? []

          const streak = calculateStreak(dates)

          return (
            <HabitItem
              key={habit.id}
              habit={{ ...habit, streak }}
            />
          )
        })}
      </ul>
    </main>
  )
}