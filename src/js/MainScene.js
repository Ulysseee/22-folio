import gsap, { Power3 } from 'gsap'

import { Scene } from 'three'

import config from '../utils/config.js'
import Debug from '../utils/Debug.js'
import Sizes from '../utils/Sizes.js'
import Time from '../utils/Time.js'
import Mouse from '../utils/Mouse.js'

import Camera from '../js/Camera.js'
import Renderer from '../js/Renderer.js'
import World from '../js/World/World.js'
import Cursor from '../js/Cursor.js'

export default class MainScene {
	constructor(_canvas, ui) {
		if (MainScene._instance) {
			return MainScene._instance
		}

		MainScene._instance = this

		this.canvas = _canvas
		this.ui = ui

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

		this.sizes.on('resize', () => {
			this.resize()
		})
		this.resize()
		window.addEventListener('scroll', () => {
			this.scrollUpdate()
		})
		this.ui.toTop.addEventListener('click', () => {
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
		if (window.scrollTop !== 0) this.ui.header.classList.add('hide')
		else this.ui.header.classList.remove('hide')

		gsap.to(this.ui.line, {
			scaleX: window.scrollProgress,
			transformOrigin: 'left',
			duration: 0.85,
			ease: Power3.ease
		})
		gsap.to([this.ui.star, this.ui.textcircle], {
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

		// ui
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
		luge.emitter.emit('resize')
		luge.emitter.emit('update')
		this.camera.resize()
		this.renderer.resize()
	}

	destroy() {}
}
