import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-root-assets',
      apply: 'build',
      writeBundle(options) {
        const outDir = options.dir || 'dist';
        const filesToCopy = ['sitemap.xml', 'robots.txt', 'ads.txt'];

        filesToCopy.forEach((file) => {
          const srcPath = path.join(__dirname, file);
          const destPath = path.join(outDir, file);

          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
