import * as THREE from 'three'
import MainScene from '../MainScene.js'

import shadesFrag from '@shaders/shades.frag'
import shadesVert from '@shaders/shades.vert'

export default class Shades {
	constructor() {
		this.time = 0

		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene

		this.geometry = new THREE.SphereBufferGeometry(1.5, 32, 32)
		this.material = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enale'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: { type: 'f', value: 0 },
				resolution: { type: 'v4', value: new THREE.Vector4() },
				uvRate1: {
					value: new THREE.Vector2(1, 1)
				}
			},
			vertexShader: shadesVert,
			fragmentShader: shadesFrag,
			side: THREE.DoubleSide
		})

		this.shades = new THREE.Mesh(this.geometry, this.material)

		this.scene.add(this.shades)
	}

	update() {
		this.time += 0.005

		this.material.uniforms.time.value = this.time
	}
}
