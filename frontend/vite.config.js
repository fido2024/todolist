// Habilitamos HTTPS usando los mismos certificados del backend

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      // usamos los certificados generados con mkcert en el backend
      key: fs.readFileSync(path.resolve(__dirname, "../backend/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "../backend/cert.pem")),
    },
  },
});