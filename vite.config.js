import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  // server: {
  //   port: 443,
  //   https: {
  //     key: fs.readFileSync('/etc/letsencrypt/live/shefoo.tech-0001/privkey.pem'),
  //     cert: fs.readFileSync('/etc/letsencrypt/live/shefoo.tech-0001/fullchain.pem')
  //   }
  // }
})
