import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import progress from "vite-plugin-progress";
import path from 'path';
import { viteZip } from 'vite-plugin-zip-file';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), progress(),
    viteZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname),
      zipName: 'dist.zip',
    })],
});
