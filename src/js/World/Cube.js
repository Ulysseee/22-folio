import * as THREE from 'three'
import MainScene from '../MainScene.js'

import simpleFrag from '@shaders/simple.frag'
import simpleVert from '@shaders/simple.vert'

export default class Cube {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene

		const shaderMat = new THREE.ShaderMaterial({
			vertexShader: simpleVert,
			fragmentShader: simpleFrag
		})
		this.cube = new THREE.Mesh(new THREE.BoxGeometry(), shaderMat)

		this.scene.add(this.cube)
	}

	update() {
		this.cube.rotation.x += 0.01
		this.cube.rotation.z += 0.01
	}
}
