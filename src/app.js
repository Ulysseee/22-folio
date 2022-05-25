import '@scss/main.scss'

import luge from '@waaark/luge'

import MainScene from '@js/MainScene'

import Loader from '@js/animations/semantic/Loader'
import Title from '@js/animations/semantic/Title'
import MenuItem from '@js/animations/semantic/MenuItem'
import Paragraph from '@js/animations/semantic/Paragraph'
import Link from '@js/animations/semantic/Link'
import SectionTitle from '@js/animations/semantic/SectionTitle'
import Work from '@js/animations/semantic/Work'
import ListItem from '@js/animations/semantic/ListItem'

import Passions from '@js/animations/Passions'
import Works from '@js/animations/Works'

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
			works: document.querySelectorAll('[data-animation="worksItem"]'),
			listItem: document.querySelectorAll('[data-animation="listItem"]')
		}
	}

	start() {
		console.log(
			'%c Proudly enhanced with Vite!',
			'background: #f7efe3; color: #000; padding: 5px 2px;'
		)

		new MainScene(document.querySelector('canvas.webgl'))
		// luge.emitter.emit('update')
		// luge.lifecycle.refresh()
		this.setAnimations()
	}

	setAnimations = () => {
		this.dom.loader.forEach((element) => new Loader({ element }))
		this.dom.title.forEach((element) => new Title({ element }))
		this.dom.menuItem.forEach((element) => new MenuItem({ element }))
		this.dom.paragraph.forEach((element) => new Paragraph({ element }))
		this.dom.links.forEach((element) => new Link({ element })),
			this.dom.sectionTitle.forEach(
				(element) => new SectionTitle({ element })
			),
			this.dom.works.forEach((element) => new Work({ element }))
		this.dom.listItem.forEach((element) => new ListItem({ element }))

		const works = new Works()
		const passions = new Passions()
	}
}
