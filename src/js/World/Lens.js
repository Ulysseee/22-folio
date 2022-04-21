import * as THREE from 'three'
import MainScene from '../MainScene.js'

import lensFrag from '@shaders/lens.frag'
import lensVert from '@shaders/lens.vert'

export default class Lens {
	constructor() {
		this.time = 0

		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.renderer = this.MainScene.renderer

		this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
			format: THREE.RGBAFormat,
			generateMipmaps: true,
			minFilter: THREE.LinearMipMapLinearFilter,
			encoding: THREE.sRGBEncoding
		})

		this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget)

		this.geometry = new THREE.SphereBufferGeometry(0.5, 36, 36)
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				tCube: { value: 0 }
			},
			defines: {
				PI: Math.PI
			},
			vertexShader: lensVert,
			fragmentShader: lensFrag
		})
		this.lens = new THREE.Mesh(this.geometry, this.material)
		this.satelitte = new THREE.Mesh(this.satGeometry, this.material)

		this.scene.add(this.lens)
	}

	update() {
		this.time += 0.001

		this.lens.visible = false
		this.cubeCamera.update(this.renderer.instance, this.scene)
		this.lens.visible = true

		this.material.uniforms.tCube.value = this.cubeRenderTarget.texture
		this.material.uniforms.uTime.value = this.time
	}
}
