import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	server: {
		port: 3001,
	},
	ssr: {
		// GSAP is ESM-only but the Netlify SSR runtime expects CJS.
		// Bundling it (noExternal) lets Vite handle the conversion.
		noExternal: ["gsap"],
	},
	plugins: [
		devtools({ eventBusConfig: { port: 42070 } }),
		netlify(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
