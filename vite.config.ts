import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' – zbudowana strona działa z dowolnego katalogu (np. GitHub Pages).
export default defineConfig({ plugins: [react()], base: './' });
