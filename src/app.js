import MainScene from './js/MainScene'

import '@scss/main.scss'

window.addEventListener('DOMContentLoaded', startApp)

function startApp() {
	console.log('Proudly enhanced with Vite!')

	const app = document.querySelector('#app')

	new MainScene(document.querySelector('canvas.webgl'))
}
