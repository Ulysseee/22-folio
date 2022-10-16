import MainScene from '@js/MainScene.js'
import Shades from '@js/World/Shades.js'
import Lens from '@js/World/Lens.js'

export default class World {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.resources = this.MainScene.resources
		this.camera = this.MainScene.camera

		this.shades = new Shades()
		this.sphere = new Lens()
	}

	update() {
		if (this.shades) this.shades.update()
		if (this.sphere) this.sphere.update()
	}

	destroy() {}
}
