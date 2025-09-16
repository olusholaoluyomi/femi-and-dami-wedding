import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 this makes assets load correctly on Vercel
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
