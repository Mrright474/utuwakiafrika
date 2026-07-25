import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        // Auto-optimize local .jpg/.jpeg/.png imports to WebP (unless caller sets params)
        if (url.searchParams.toString()) return new URLSearchParams();
        if (/\.(jpe?g|png)$/i.test(url.pathname)) {
          return new URLSearchParams({ format: 'webp', quality: '78' });
        }
        return new URLSearchParams();
      },
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', 'lucide-react'],
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
      'lucide-react'
    ],
  },
}));
