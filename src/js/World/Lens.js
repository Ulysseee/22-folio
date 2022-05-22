import * as THREE from 'three'
import MainScene from '../MainScene.js'

import lensFrag from '@shaders/lens.frag'
import lensVert from '@shaders/lens.vert'

export default class Lens {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.time = this.MainScene.time
		this.renderer = this.MainScene.renderer
		this.debug = this.MainScene.debug
		this.camera = this.MainScene.camera.instance
		this.mouse = this.MainScene.mouse

		this.settings = {
			mRefractionRatio: 1.02,
			mFresnelBias: 0.1,
			mFresnelScale: 4,
			mFresnelPower: 2
		}

		this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
			format: THREE.RGBAFormat,
			generateMipmaps: true,
			minFilter: THREE.LinearMipMapLinearFilter,
			encoding: THREE.sRGBEncoding
		})

		this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget)

		this.geometry = new THREE.SphereBufferGeometry(0.6, 36, 36)
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				tCube: { value: 0 },
				mRefractionRatio: { value: this.settings.mRefractionRatio },
				mFresnelBias: { value: this.settings.mFresnelBias },
				mFresnelScale: { value: this.settings.mFresnelScale },
				mFresnelPower: { value: this.settings.mFresnelPower }
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

		this.camera.lookAt(this.lens.position)

		if (this.debug) this.setDebug()
	}

	setDebug() {
		const axesHelper = new THREE.AxesHelper(1)
		this.scene.add(axesHelper)

		const f = this.debug.gui.addFolder({
			title: 'Fresnel',
			expanded: true
		})

		f.addInput(this.settings, 'mRefractionRatio', {
			min: 0,
			max: 3,
			step: 0.1
		})
		f.addInput(this.settings, 'mFresnelBias', {
			min: 0,
			max: 1,
			step: 0.1
		})
		f.addInput(this.settings, 'mFresnelScale', {
			min: 0,
			max: 6,
			step: 0.1
		})
		f.addInput(this.settings, 'mFresnelPower', {
			min: 0,
			max: 3,
			step: 0.1
		})

		f.on('change', ({ presetKey }) => {
			this.setUniforms(presetKey)
		})
	}

	setUniforms(key) {
		const { uniforms } = this.material
		uniforms[key].value = this.settings[key]
	}

	update() {
		this.lens.visible = false
		this.cubeCamera.update(this.renderer.instance, this.scene)
		this.lens.visible = true

		this.material.uniforms.tCube.value = this.cubeRenderTarget.texture
		this.material.uniforms.uTime.value = this.time.elapsed / 4000

		this.lens.position.x = -this.mouse.delayedMousePos.x * 0.08
		this.lens.position.y = this.mouse.delayedMousePos.y * 0.08
	}
}
