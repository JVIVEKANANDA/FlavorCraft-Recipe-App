import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
  base: './',
=======
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 467d0be7e5a9d1e75671d57f5bd434a339e2bf77
  server: {
    port: 5173,
    open: true
  }
});
