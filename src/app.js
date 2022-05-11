import MainScene from '@js/MainScene'

import Loader from '@js/animations/semantic/Loader'
import Title from '@js/animations/semantic/Title'
import MenuItem from '@js/animations/semantic/MenuItem'
import Paragraph from '@js/animations/semantic/Paragraph'
import Links from '@js/animations/semantic/Links'
import SectionTitle from '@js/animations/semantic/SectionTitle'
import ListItem from '@js/animations/semantic/ListItem'

import Passions from '@js/animations/Passions'

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
			paragraph: document.querySelectorAll(
				'[data-animation="paragraph"]'
			),
			links: document.querySelectorAll('[data-animation="link"]'),
			sectionTitle: document.querySelectorAll(
				'[data-animation="sectionTitle"]'
			),
			listItem: document.querySelectorAll('[data-animation="listItem"]')
		}
	}

	start() {
		console.log('Proudly enhanced with Vite!')

		const app = document.querySelector('#app')

		new MainScene(document.querySelector('canvas.webgl'))
		new Passions()
		this.setAnimations()
	}

	setAnimations = () => {
		this.dom.loader.forEach((element) => new Loader({ element }))
		this.dom.title.forEach((element) => new Title({ element }))
		this.dom.menuItem.forEach((element) => new MenuItem({ element }))
		this.dom.paragraph.forEach((element) => new Paragraph({ element }))
		this.dom.links.forEach((element) => new Links({ element })),
			this.dom.sectionTitle.forEach(
				(element) => new SectionTitle({ element })
			),
			this.dom.listItem.forEach((element) => new ListItem({ element }))
	}
}
