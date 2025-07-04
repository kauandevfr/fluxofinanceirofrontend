import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    // open: true,
    host: true,
    allowedHosts: [
      'sponsorship-strap-pipes-salon.trycloudflare.com'
    ]
  }
})
