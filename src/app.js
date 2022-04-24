import MainScene from './js/MainScene'

import '@scss/main.scss'

window.addEventListener('DOMContentLoaded', startApp)

function startApp() {
	console.log('Powered with Vite.js')

	const app = document.querySelector('#app')

	new MainScene(document.querySelector('canvas.webgl'))
}
