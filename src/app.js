import LocomotiveScroll from 'locomotive-scroll'

import MainScene from '@js/MainScene'
import Cursor from '@js/Cursor'

import Loader from '@js/animations/Loader'
import Title from '@js/animations/Title'
import MenuItem from '@js/animations/MenuItem'
import Paragraph from '@js/animations/Paragraph'

import '@scss/main.scss'

window.addEventListener('DOMContentLoaded', () => {
	const app = new App()
	app.start()
})

class App {
	constructor() {
		this.dom = {
			loader: document.querySelectorAll('[data-animation="loader"]'),
			title: document.querySelectorAll('[data-animation="title"]'),
			menuItem: document.querySelectorAll('[data-animation="menuItem"]'),
			paragraph: document.querySelectorAll('[data-animation="paragraph"]')
		}
	}

	start() {
		console.log('Proudly enhanced with Vite!')

		const app = document.querySelector('#app')
		const cursor = new Cursor(document.querySelectorAll('.cursor'))

		new MainScene(document.querySelector('canvas.webgl'))
		this.setAnimations()
	}

	setAnimations = () => {
		this.dom.loader.forEach((element) => new Loader({ element }))
		this.dom.title.forEach((element) => new Title({ element }))
		this.dom.menuItem.forEach((element) => new MenuItem({ element }))
		this.dom.paragraph.forEach((element) => new Paragraph({ element }))
	}
}
