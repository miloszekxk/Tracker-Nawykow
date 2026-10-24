import { defineConfig } from 'vitest/config'

// Testy dat uruchamiane zawsze w polskiej strefie czasowej,
// niezależnie od ustawień komputera czy serwera CI.
process.env.TZ = 'Europe/Warsaw'

export default defineConfig({
  test: {
    include: ['lib/**/*.test.ts'],
  },
})
