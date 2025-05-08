import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  base: '/tab/',
  server: {
    //host: '62.169.26.178',
    port: 53044,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
    },
  },
});
