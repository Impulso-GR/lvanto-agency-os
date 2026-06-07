import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static frontend prototype — no backend, no env, no proxies.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
})
