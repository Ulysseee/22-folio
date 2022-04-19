import { WebGLRenderer } from 'three'
import MainScene from './MainScene'

export default class Renderer {
	constructor() {
		this.MainScene = new MainScene()
		this.canvas = this.MainScene.canvas
		this.sizes = this.MainScene.sizes
		this.scene = this.MainScene.scene
		this.camera = this.MainScene.camera

		this.setInstance()
	}

	setInstance() {
		this.instance = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			logarithmicDepthBuffer: true
		})

		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}
