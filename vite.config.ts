import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen(), react()],
  ssr: {
    noExternal: ['@shopify/hydrogen', 'react-quill', 'recharts'],
  },
});
