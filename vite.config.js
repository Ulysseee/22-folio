import { defineConfig, loadEnv } from 'vite'
import glsl from 'vite-plugin-glsl'
import glslify from 'vite-plugin-glslify'

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
		assetsInclude: ['**/*.gltf'],
		plugins: [glslify()],
		publicDir: true,
		resolve: {
			alias: [
				{ find: '@js', replacement: '/src/js' },
				{ find: '@scss', replacement: '/src/scss' },
				{ find: '@shaders', replacement: '/src/shaders' },
				{ find: '@utils', replacement: '/src/utils' }
			],
			extensions: ['.cjs', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
		},
		preprocessorOptions: {
			scss: {
				sassOptions: {
					outputStyle: 'compressed'
				}
			}
		}
	})
}
