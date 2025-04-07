import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from keys.env
dotenv.config({ path: './keys.env' });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Makes process.env variables available in the app
  },
});
