import MainScene from '../js/MainScene'
import EventEmitter from './EventEmitter'
import { lerp } from './Maths'

export default class Mouse extends EventEmitter {
	constructor() {
		super()
		this.MainScene = new MainScene()
		this.debug = this.MainScene.debug
		this.sizes = this.MainScene.sizes

		this.debugObject = {
			lerpIntensity: 0.025
		}
		this.clientMousePos = { x: 0, y: 0 }
		this.mousePos = { x: 0, y: 0 }
		this.delayedMousePos = { x: 0, y: 0 }
		this.mouseRotation = { x: 0, y: 0 }

		window.addEventListener('mousemove', (e) => this.setMouse(e))
		if (this.debug) this.setDebug()
	}

	setDebug() {
		this.debugFolder = this.debug.ui.addFolder('Mouse')
		this.debugFolder.close()
		this.debugFolder.add(this.debugObject, 'lerpIntensity', 0, 0.5)
	}

	setMouse(e) {
		this.clientMousePos.x = e.clientX
		this.clientMousePos.y = e.clientY
		this.mousePos.x = e.clientX / (this.sizes.width / 2) - 1
		this.mousePos.y = e.clientY / (this.sizes.height / 2) - 1
	}

	update() {
		this.delayedMousePos.x = lerp(
			this.delayedMousePos.x,
			this.mousePos.x,
			this.debugObject.lerpIntensity
		)
		this.delayedMousePos.y = lerp(
			this.delayedMousePos.y,
			this.mousePos.y,
			this.debugObject.lerpIntensity
		)
		this.mouseRotation.x = this.delayedMousePos.y * -1 * 0.35
		this.mouseRotation.y = this.delayedMousePos.x * -1 * 0.35
	}
}
