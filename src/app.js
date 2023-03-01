import './scss/main.scss'

import config from '@utils/config.js'
import device from '@utils/device'
import { disableScroll, enableScroll } from '@utils/Dom'

import MainScene from '@js/MainScene.js'
import Title from './js/animations/semantic/Title.js'
import MenuItem from './js/animations/semantic/MenuItem.js'
import Paragraph from './js/animations/semantic/Paragraph.js'
import Link from './js/animations/semantic/Link.js'
import SectionTitle from './js/animations/semantic/SectionTitle.js'
import Work from './js/animations/semantic/Work.js'
import ListItem from './js/animations/semantic/ListItem.js'

import Loader from './js/animations/semantic/Loader.js'
import Passions from '@js/Animations/Passions.js'
import Works from '@js/Animations/Works.js'

import luge from '@waaark/luge'

luge.lifecycle.add('siteIn', (done) => {
	luge.emitter.emit('update')

	window.scrollTo({ top: 0 })
	disableScroll()

	const app = new App()
	app.start()

	luge.emitter.emit('update')
	done()
}, 10, 'load')

class App {
	constructor() {
		this.ui = {
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
		this.helloThere()
		this.ui.app.style.visibility = 'visible'

		new MainScene(this.ui.canvas, this.ui)
		this.setAnimations()
	}

	setAnimations = () => {
		this.ui.loader.forEach((element) => new Loader({ element }))
		this.ui.title.forEach((element) => new Title({ element }))
		this.ui.menuItem.forEach((element) => new MenuItem({ element }))
		this.ui.paragraph.forEach((element) => new Paragraph({ element }))
		this.ui.links.forEach((element) => new Link({ element })),
			this.ui.sectionTitle.forEach(
				(element) => new SectionTitle({ element })
			),
			this.ui.works.forEach((element) => new Work({ element }))
		this.ui.listItem.forEach((element) => new ListItem({ element }))

		if(!device.isTouch()) {
			new Works()
			new Passions()
		}
	}

	helloThere() {
		let ua = navigator.userAgent.toLowerCase()
		if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
			window.console.log.apply(console, config.credit)
		} else
			window.console.log('Site by Ulysse Gravier - https://ulyssegravier.fr/')
	}
}
