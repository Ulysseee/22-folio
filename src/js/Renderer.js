import { WebGLRenderer } from 'three'
import MainScene from './MainScene'

import { DotScreenShader } from './customShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

export default class Renderer {
	constructor() {
		this.MainScene = new MainScene()
		this.canvas = this.MainScene.canvas
		this.sizes = this.MainScene.sizes
		this.scene = this.MainScene.scene
		this.camera = this.MainScene.camera

		this.setInstance()
		this.setComposer()
	}

	setComposer() {
		this.composer = new EffectComposer(this.instance)
		this.composer.addPass(new RenderPass(this.scene, this.camera.instance))

		const effect1 = new ShaderPass(DotScreenShader)
		effect1.uniforms['scale'].value = 3
		this.composer.addPass(effect1)
	}

	setInstance() {
		this.instance = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			logarithmicDepthBuffer: true
		})
		this.instance.xr.enabled = false
		this.instance.debug.checkShaderErrors = true
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
		this.composer.render(this.scene, this.camera.instance)
	}
}
