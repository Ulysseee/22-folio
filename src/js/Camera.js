import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import MainScene from './MainScene.js'
import config from '../utils/config.js'

export default class Camera {
	constructor() {
		this.MainScene = new MainScene()
		this.sizes = this.MainScene.sizes
		this.scene = this.MainScene.scene
		this.canvas = this.MainScene.canvas
		this.mouse = this.MainScene.mouse

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		const perspective = 500
		const fov =
			(180 * (2 * Math.atan(this.sizes.height / 2 / perspective))) /
			Math.PI

		this.instance = new PerspectiveCamera(
			fov,
			this.sizes.width / this.sizes.height,
			0.1,
			1000
		)
		this.instance.position.set(0, 0, 1.5)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enabled = config.controls
		this.controls.enableDamping = true
		this.controls.maxDistance = 1500
		this.controls.minDistance = 0
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()

		if (this.sizes.width > 768) {
			this.instance.position.x = this.mouse.delayedMousePos.x * 0.25
			this.instance.position.y = -this.mouse.delayedMousePos.y * 0.25
		} else {
			this.instance.position.x = this.instance.position.y = 0
		}
	}
}
