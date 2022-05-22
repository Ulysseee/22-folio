import { Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap, { Power3 } from 'gsap'

import config from '@utils/config'
import Debug from '@utils/Debug'
import Sizes from '@utils/Sizes'
import Time from '@utils/Time'
import Camera from '@js/Camera'
import Renderer from '@js/Renderer'
import World from '@js/World/World'

import Cursor from '@js/Cursor'
import SmoothScroll from '@js/SmoothScroll'

import Mouse from '@utils/Mouse'

export default class MainScene {
	constructor(_canvas) {
		if (MainScene._instance) {
			return MainScene._instance
		}

		MainScene._instance = this

		this.canvas = _canvas

		this.sizes = new Sizes()
		this.time = new Time()
		this.mouse = new Mouse()
		this.setDebug()

		this.scene = new Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()

		this.cursor = new Cursor(document.querySelectorAll('.cursor'), [
			'a',
			'.works__heading'
		])

		this.scroll = {
			height: 0,
			limit: 0,
			hard: 0,
			soft: 0,
			ease: 0.1,
			normalized: 0,
			running: false
		}

		this.scrollEl = {
			header: document.querySelector('header'),
			line: document.querySelector('.nav-w__state-on'),
			star: document.querySelector('.star'),
			textcircle: document.querySelector('.textcircle')
		}

		this.smoothScroll = new SmoothScroll({
			element: document.querySelector('[data-scroll-container]'),
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight
			},
			scroll: this.scroll
		})

		this.sizes.on('resize', () => {
			this.resize()
		})
		this.smoothScroll.on('scroll', () => {
			if (!this.scroll.running) this.scroll.running = true
		})
		const toTop = document.querySelector('#toTop')
		toTop.addEventListener('click', () => {
			this.scroll.hard = 0
			this.scroll.soft = 0
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
			this.scrollUpdate()
		})

		this.update()
	}

	scrollUpdate() {
		this.scroll.running = false
		this.scroll.normalized = (this.scroll.hard / this.scroll.limit).toFixed(
			1
		)

		if (this.scroll.hard !== 0) this.scrollEl.header.classList.add('hide')
		else this.scrollEl.header.classList.remove('hide')

		gsap.to(this.scrollEl.line, {
			scaleX: this.scroll.normalized,
			transformOrigin: 'left',
			duration: 0.85,
			ease: Power3.ease
		})
		gsap.to([this.scrollEl.star, this.scrollEl.textcircle], {
			rotate: this.scroll.hard * 0.5,
			duration: 0.85,
			ease: Power3.ease
		})
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()
		}
	}

	update() {
		// TIME
		this.time.tick()

		// DOM
		this.cursor.cursorElements.forEach((el) => el.render())

		// SMOOTH SCROLL
		this.smoothScroll.update()
		if (this.scroll.running) this.scrollUpdate()

		// WEBGL
		this.mouse.update()
		if (this.camera) this.camera.update()
		if (this.world) this.world.update()
		if (this.renderer) this.renderer.update()
		if (this.debug) this.debug.stats.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
		this.smoothScroll.resize()
	}

	destroy() {}
}
