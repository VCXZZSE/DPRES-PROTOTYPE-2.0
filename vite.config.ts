
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { visualizer } from 'rollup-plugin-visualizer';
  import { compression } from 'vite-plugin-compression2';
  import { VitePWA } from 'vite-plugin-pwa';

  export default defineConfig({
    plugins: [
      react(),
      // PWA Plugin
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'DPRES - Disaster Preparedness & Response Education System',
          short_name: 'DPRES',
          description: 'Comprehensive disaster preparedness platform for educational institutions with emergency alerts, training modules, and VR simulations.',
          theme_color: '#dc2626',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          shortcuts: [
            {
              name: 'Emergency SOS',
              short_name: 'SOS',
              description: 'Quick access to emergency SOS feature',
              url: '/?shortcut=sos',
              icons: [{ src: 'icons/icon-96x96.png', sizes: '96x96' }]
            },
            {
              name: 'Dashboard',
              short_name: 'Dashboard',
              description: 'View your training dashboard',
              url: '/dashboard',
              icons: [{ src: 'icons/icon-96x96.png', sizes: '96x96' }]
            }
          ]
        },
        workbox: {
          globPatterns: [],
          navigateFallback: null,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                }
              }
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true
        }
      }),
      // Gzip compression
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      // Brotli compression (better than gzip)
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      // Bundle analyzer (only in build mode)
      visualizer({
        open: false,
        filename: 'build/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      chunkSizeWarningLimit: 1000,
      // Manual chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              // React core
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              // Radix UI components
              if (id.includes('@radix-ui')) {
                return 'ui-vendor';
              }
              // Charts
              if (id.includes('recharts')) {
                return 'chart-vendor';
              }
              // Framer motion and animations
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'animation-vendor';
              }
              // Forms and validation
              if (id.includes('react-hook-form') || id.includes('zod')) {
                return 'form-vendor';
              }
              // Other vendors
              return 'vendor';
            }
            // Admin components in separate chunk
            if (id.includes('/components/admin/') || id.includes('AdminDashboard')) {
              return 'admin';
            }
            // VR Training in separate chunk
            if (id.includes('VRTraining')) {
              return 'vr-training';
            }
          },
        },
      },
      // Optimize dependencies
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        },
        mangle: {
          safari10: true,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  });