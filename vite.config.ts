import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './routes',
      generatedRouteTree: './routeTree.gen.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './'),
      styles: path.resolve(import.meta.dirname, './styles'),
      utils: path.resolve(import.meta.dirname, './utils'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  }
})
