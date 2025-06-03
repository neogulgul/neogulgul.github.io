import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"

export default defineConfig(function(params)
{
	const documents = {}
	const documentsPath = "./public/documents/"
	fs.readdirSync(documentsPath).forEach((fileName) => {
		const filePath = documentsPath + fileName
		documents[fileName] = fs.readFileSync(filePath, "utf8")
	})

	return {
		plugins: [react()],
		server: {
			host: "0.0.0.0",
			port: 3000
		},
		build: {
			outDir: process.env.VITE_BUILD_DIR
		},
		define: {
			__DOCUMENTS__: JSON.stringify(documents)
		}
	}
})

