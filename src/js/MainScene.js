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
			'.explorable'
		])

		this.scrollEl = {
			header: document.querySelector('header'),
			line: document.querySelector('.nav-w__state-on'),
			star: document.querySelector('.star'),
			textcircle: document.querySelector('.textcircle'),
			toTop: document.querySelector('#toTop')
		}

		this.sizes.on('resize', () => {
			this.resize()
		})
		window.addEventListener('mousewheel', () => {
			this.scrollUpdate()
		})
		this.scrollEl.toTop.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
			window.scrollTop =
				window.scrollProgress =
				window.smoothScrollTop =
					0
			this.scrollUpdate()
		})

		this.update()
	}

	scrollUpdate() {
		if (window.scrollTop !== 0) this.scrollEl.header.classList.add('hide')
		else this.scrollEl.header.classList.remove('hide')

		gsap.to(this.scrollEl.line, {
			scaleX: window.scrollProgress,
			transformOrigin: 'left',
			duration: 0.85,
			ease: Power3.ease
		})
		gsap.to([this.scrollEl.star, this.scrollEl.textcircle], {
			rotate: window.smoothScrollTop * 0.5,
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
	}

	destroy() {}
}
