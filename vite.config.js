import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(function(params)
{
	return {
		plugins: [react()],
		server: {
			host: "0.0.0.0",
			port: 3000
		},
		build: {
			outDir: process.env.VITE_BUILD_DIR
		}
	}
})

