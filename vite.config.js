
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

export default defineConfig( {
  
    base: "/pumppals-fitness-tracker/",
    plugins: [react()],
  }
);