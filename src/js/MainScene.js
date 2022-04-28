import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

import config from '@utils/config'
import Debug from '@utils/Debug'
import Sizes from '@utils/Sizes'
import Time from '@utils/Time'
import Camera from '@js/Camera'
import Renderer from '@js/Renderer'
import World from '@js/World/World'

import SmoothScroll from '@js/SmoothScroll'

export default class MainScene {
	constructor(_canvas) {
		if (MainScene._instance) {
			return MainScene._instance
		}

		MainScene._instance = this

		this.canvas = _canvas

		this.sizes = new Sizes()
		this.time = new Time()
		this.setDebug()
		this.scene = new THREE.Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()

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
			line: document.querySelector('.nav-w__state-on')
		}

		this.smoothScroll = new SmoothScroll({
			element: document.querySelector('[data-scroll-container]'),
			viewport: {
				width: this.sizes.width,
				height: this.sizes.height
			},
			scroll: this.scroll
		})

		this.sizes.on('resize', () => {
			this.resize()
		})

		window.addEventListener('scroll', this.onScroll.bind(this))

		this.update()
	}

	onScroll() {
		if (!this.scroll.running) {
			this.scroll.running = true
		}
	}

	scrollLineUpdate() {
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
			ease: 'ease'
		})
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()
		}
	}

	update() {
		this.smoothScroll.update()
		if (this.scroll.running) this.scrollLineUpdate()

		this.camera.update()

		if (this.world) this.world.update()

		if (this.renderer) this.renderer.update()

		if (this.debug) this.debug.stats.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.smoothScroll.onResize()
		this.camera.resize()
		this.renderer.resize()
	}

	destroy() {}
}
