'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Błędny email lub hasło')
      return
    }

    router.push('/')
    router.refresh()
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </h1>
        <p className="text-slate-400 text-sm mb-6">Śledź swoje codzienne postępy</p>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="flex flex-col gap-3"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-700 bg-slate-900 rounded-lg p-2 outline-none focus:border-slate-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-700 bg-slate-900 rounded-lg p-2 outline-none focus:border-slate-500 transition-colors"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-2 font-medium transition-colors"
          >
            {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
          </button>
        </form>

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-slate-400 hover:text-slate-200 mt-4 transition-colors"
        >
          {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
        </button>
      </div>
    </main>
  )
}