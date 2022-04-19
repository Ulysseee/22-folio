import MainScene from '../MainScene'

import Cube from './Cube'

export default class World {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.resources = this.MainScene.resources
		this.camera = this.MainScene.camera

		this.cube = new Cube()
	}

	update() {
		if (this.cube) this.cube.update()
	}

	destroy() {}
}
