import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
    process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5001';

const isProd = process.env.NODE_ENV === 'production'
const buildLocal = process.env.MODE === 'local'

// Define DEPLOY_API first
const DEPLOY_API = process.env.KAMAL_DEPLOY_HOST 
    ? `https://${process.env.KAMAL_DEPLOY_HOST}` 
    : target

// Now use it for API_URL
const API_URL = isProd ? DEPLOY_API : (buildLocal ? '' : target)

// Only required if accessing vite directly, e.g. http://localhost:5173
const proxy = {
        '^/api': {
            target,
            secure: false
        }
    }

export default defineConfig({
    define: { apiBaseUrl: `"${API_URL}"` },
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    build: {
        target: 'baseline-widely-available',
    },
    server: {
        host: true, // Listen on all interfaces (both IPv4 and IPv6)
        proxy,        
    }    
})
