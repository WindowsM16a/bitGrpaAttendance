import { defineConfig } from "vite";

export default defineConfig({
	root: "src",
	build: {
		rollupOptions: {
			input: {
				main: "./src/index.html",
				qr: "./src/qrCode.html",
			},
		},
		outDir: "./dist",
		emptyOutDir: true,
	},
	server: {
		port: 3000,
		strictPort: true,
	},
});
