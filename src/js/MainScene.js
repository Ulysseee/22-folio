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

export default class MainScene {
	constructor(_canvas) {
		if (MainScene._instance) {
			return MainScene._instance
		}

		MainScene._instance = this

		this.canvas = _canvas

		this.cursor = new Cursor(document.querySelectorAll('.cursor'))

		this.sizes = new Sizes()
		this.time = new Time()
		this.InitLoader()
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

	InitLoader() {
		const loaderTitle = new SplitType('.loader__title', {
			types: 'chars'
		})
		gsap.timeline()
			.from(loaderTitle.chars, {
				y: '100%',
				skewX: 20,
				duration: 0.8,
				stagger: {
					each: 0.02,
					from: 'start'
				},
				delay: 0.9,
				ease: Power3.easeInOut
			})
			.to(loaderTitle.chars, {
				y: '-120%',
				duration: 0.8,
				stagger: {
					each: 0.02,
					from: 'end'
				},
				delay: 0.8,
				ease: Power3.easeInOut
			})
		gsap.timeline({ delay: 2.8 })
			.to('.loader__overlay path', {
				duration: 0.7,
				ease: Power2.easeIn,
				attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
			})
			.to('.loader__overlay path', {
				duration: 0.9,
				ease: Power2.easeOut,
				attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
			})

		const dom = {
			landingFirstEl: new SplitType('.title__first__el', {
				types: 'chars'
			}),
			landingSecondEl: new SplitType('.title__second__el', {
				types: 'chars'
			}),
			landingThirdEl: new SplitType('.title__third__el', {
				types: 'chars'
			})
		}

		gsap.timeline({ delay: 3.4 }).from(
			[
				...dom.landingFirstEl.chars,
				...dom.landingSecondEl.chars,
				...dom.landingThirdEl.chars
			],
			{
				y: '100%',
				duration: 0.8,
				stagger: 0.04,
				ease: Power3.inOut
			}
		)
		// .to('.title__first__el', {
		// 	x: 20,
		// 	duration: 0.8,
		// 	delay: -0.3,
		// 	ease: Power3.easeOut
		// })
		// .to('.title__second__el', {
		// 	x: -180,
		// 	duration: 0.8,
		// 	delay: -0.75,
		// 	ease: Power3.easeOut
		// })
		// .to('.title__third__el', {
		// 	x: 95,
		// 	duration: 0.8,
		// 	delay: -0.75,
		// 	ease: Power3.easeOut
		// })
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
