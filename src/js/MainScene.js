import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap, { Power2, Power3 } from 'gsap'
import SplitType from 'split-type'

import config from '@utils/config'
import Debug from '@utils/Debug'
import Sizes from '@utils/Sizes'
import Time from '@utils/Time'
import Camera from '@js/Camera'
import Renderer from '@js/Renderer'
import World from '@js/World/World'

import Cursor from '@js/Cursor'

import Loader from '@js/animations/Loader'
import Title from '@js/animations/Title'

export default class MainScene {
	constructor(_canvas) {
		if (MainScene._instance) {
			return MainScene._instance
		}

		MainScene._instance = this

		this.canvas = _canvas
		this.dom = {
			loader: document.querySelectorAll('[data-animation="loader"]'),
			title: document.querySelectorAll('[data-animation="title"]')
		}

		const createAnimations = () => {
			this.dom.loader.forEach((element) => new Loader({ element }))
			this.dom.title.forEach((element) => new Title({ element }))
		}
		createAnimations()

		this.cursor = new Cursor(document.querySelectorAll('.cursor'))

		this.sizes = new Sizes()
		this.time = new Time()
		this.setDebug()
		this.scene = new THREE.Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()

		this.sizes.on('resize', () => {
			this.resize()
		})

		this.update()
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()
		}
	}

	update() {
		this.camera.update()

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
