import '@scss/main.scss'

import MainScene from '@js/MainScene'

import Loader from '@js/Animations/semantic/Loader'
import Title from '@js/Animations/semantic/Title'
import MenuItem from '@js/Animations/semantic/MenuItem'
import Paragraph from '@js/Animations/semantic/Paragraph'
import Link from '@js/Animations/semantic/Link'
import SectionTitle from '@js/Animations/semantic/SectionTitle'
import Work from '@js/Animations/semantic/Work'
import ListItem from '@js/Animations/semantic/ListItem'

import Passions from '@js/Animations/Passions'
import Works from '@js/Animations/Works'

import luge from '@waaark/luge'

luge.emitter.on('afterPageLoad', () => luge.emitter.emit('update'))

luge.lifecycle.add(
	'siteLoad',
	(done) => {
		luge.emitter.emit('update')

		const app = new App()
		app.start()

		luge.emitter.emit('update')

		done()
	},
	'load'
)

class App {
	constructor() {
		this.dom = {
			app: document.querySelector('#app'),
			canvas: document.querySelector('canvas.webgl'),
			header: document.querySelector('header'),
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
			listItem: document.querySelectorAll('[data-animation="listItem"]'),
			line: document.querySelector('.nav-w__state-on'),
			star: document.querySelector('.star'),
			textcircle: document.querySelector('.textcircle'),
			toTop: document.querySelector('#toTop')
		}
	}

	start() {
		this.hello()
		this.dom.app.style.visibility = 'visible'

		new MainScene(this.dom.canvas, this.dom)

		const canvasHeight = this.dom.canvas.offsetHeight
		if (window.scrollTop - canvasHeight >= 0) this.updateDelay()

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

	updateDelay() {
		this.dom.title.forEach((el, i) => {
			el.setAttribute('data-animation-delay', 0.5 + i / 5)
		})
	}

	hello() {
		let ua = navigator.userAgent.toLowerCase()
		if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
			let args = [
				'%c %c  Site by Ulysse Gravier  %c %c  https://ulyssegravier.fr/  %c ',
				'background: #fe3301; border: 1px solid #fe3301; padding:5px 0; margin:3px 0 10px 0;',
				'background: #ffffff; border: 1px solid #fe3301; color: #fe3301; padding:5px 0; margin:3px 0 10px 0;',
				'background: #fe3301; border: 1px solid #fe3301; padding:5px 0; margin:3px 0 10px 0;',
				'background: #ffffff; border: 1px solid #fe3301; color: #fe3301; padding:5px 0; margin:3px 0 10px 0;',
				'background: #fe3301; border: 1px solid #fe3301; padding:5px 0; margin:3px 0 10px 0;'
			]

			window.console.log.apply(console, args)
		} else
			window.console.log(
				'Site by Ulysse Gravier - https://ulyssegravier.fr/'
			)
	}
}
