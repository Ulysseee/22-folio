import '@scss/main.scss'

import MainScene from './js/MainScene'

window.addEventListener('DOMContentLoaded', startApp)

function startApp() {
	console.log('Powered with Vite.js')

	new MainScene(document.querySelector('canvas.webgl'))
}
