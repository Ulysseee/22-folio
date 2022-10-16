import { defineConfig, loadEnv } from "vite";
import glslify from 'vite-plugin-glslify'
import path from 'path';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		server: {
			port: process.env.VITE_PORT,
			https: false,
			open: false,
			host: true,
			hmr: { port: process.env.VITE_PORT }
		},
		plugins: [glslify()],
		resolve: {
			alias: {
				'@js': path.resolve(__dirname, './src/js'),
				'@scss': path.resolve(__dirname, './src/scss'),
				'@shaders': path.resolve(__dirname, './src/shaders'),
				'@utils': path.resolve(__dirname, './src/utils')
			}
		}
	});
}
