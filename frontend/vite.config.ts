import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 5173,
    open: false,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mantine: ['@mantine/core', '@mantine/hooks', '@mantine/notifications', '@mantine/dates'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
