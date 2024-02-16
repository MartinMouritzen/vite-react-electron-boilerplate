import { rmSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import vitePluginSvgr from 'vite-plugin-svgr'
import pkg from './package.json'

let defaultConfig = {
	plugins: [
		vitePluginSvgr(),
		react(),
	],
	resolve: {
		alias: {
			'@': path.join(__dirname,'src')
		}
	}
};

export default defineConfig(({ mode }) => {
	rmSync('dist-electron', { recursive: true, force: true })

	const isServe = mode === 'serve'
	const isBuild = mode === 'build'
	const sourcemap = isServe || !!process.env.VSCODE_DEBUG

	if (mode === 'web') {
		return defaultConfig;
	}
	else {
		defaultConfig.plugins = [
			...defaultConfig.plugins,
			electron([
				{
					// Main-Process entry file of the Electron App.
					entry: 'electron/main/index.js',
					onstart(options) {
						if (process.env.VSCODE_DEBUG) {
							console.log('[startup] Electron App')
						} else {
							options.startup()
						}
					},
					vite: {
						build: {
							sourcemap,
							minify: isBuild,
							outDir: 'dist-electron/main',
							rollupOptions: {
								external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
							},
						},
					},
				},
				{
					entry: 'electron/preload/index.js',
					onstart(options) {
						// Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
						// instead of restarting the entire Electron App.
						options.reload()
					},
					vite: {
						build: {
							sourcemap: sourcemap ? 'inline' : undefined, // #332
							minify: isBuild,
							outDir: 'dist-electron/preload',
							rollupOptions: {
								external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
							},
						},
					},
				}
			]),
			// Use Node.js API in the Renderer-process
			renderer(),
		];
		defaultConfig.server = process.env.VSCODE_DEBUG && (() => {
				const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
				return {
					host: url.hostname,
					port: +url.port,
				}
		})(),
		defaultConfig.clearScreen = false;
		return defaultConfig;
	}
})