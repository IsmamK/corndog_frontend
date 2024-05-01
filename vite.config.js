import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
        "/api": {
          target: "www.thefoodpark.xyz/backend/api",
          changeOrigin:true,
          rewrite: (path)=>path.replace(/^\/api/,"")
        }

    }
     
  }
})
