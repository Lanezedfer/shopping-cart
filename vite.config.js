import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(ttf|woff|woff2)$/.test(assetInfo.name)) {
            return "assets/fonts/[name][extname]";
          } else if (/\.(css)$/.test(assetInfo.name)) {
            return "assets/css/[name][extname]";
          } else if (/\.(svg)$/.test(assetInfo.name)) {
            return "assets/images/icons/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
