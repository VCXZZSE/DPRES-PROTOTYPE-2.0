
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-hook-form@7.55.0': 'react-hook-form',
        'next-themes@0.4.6': 'next-themes',
        'figma:asset/eb676453f7fa58e46cc7a87afbf8720a41cd2d30.png': path.resolve(__dirname, './src/assets/eb676453f7fa58e46cc7a87afbf8720a41cd2d30.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  });