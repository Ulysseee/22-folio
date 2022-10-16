import * as THREE from 'three'

import MainScene from '@js/MainScene.js'

import shadesFrag from '@shaders/shades.frag'
import shadesVert from '@shaders/shades.vert'

export default class Shades {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.debug = this.MainScene.debug
		this.time = this.MainScene.time
		this.mouse = this.MainScene.mouse

		this.settings = {
			uBaseFirst: '#f7efe3',
			uBaseSecond: '#fe3301',
			uAccent: '#5c6c73'
		}

		this.tCol = {
			baseFirst: new THREE.Color(),
			baseSecond: new THREE.Color(),
			accent: new THREE.Color()
		}

		this.geometry = new THREE.SphereBufferGeometry(1.5, 32, 32)
		this.material = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enale'
			},
			side: THREE.DoubleSide,
			uniforms: {
				time: { type: 'f', value: 0 },
				uBaseFirst: {
					value: this.tCol.baseFirst.set(this.settings.uBaseFirst)
				},
				uBaseSecond: {
					value: this.tCol.baseSecond.set(this.settings.uBaseSecond)
				},
				uAccent: { value: this.tCol.accent.set(this.settings.uAccent) },
				uMouse: { value: [0, 0] }
			},
			vertexShader: shadesVert,
			fragmentShader: shadesFrag,
			side: THREE.DoubleSide
		})

		this.shades = new THREE.Mesh(this.geometry, this.material)

		this.scene.add(this.shades)

		if (this.debug) this.setDebug()
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'Shades colors',
			expanded: true
		})

		for (const _colorName in this.settings) {
			f.addInput(this.settings, _colorName, {
				label: `${_colorName}`,
				view: 'color'
			}).on('change', ({ presetKey }) => {
				this.setUniforms(presetKey)
			})
		}
	}

	setUniforms(key) {
		const { uniforms } = this.material

		uniforms[key].value = new THREE.Color(this.settings[key])
	}

	update() {
		this.material.uniforms.time.value = this.time.elapsed / 4000

		this.material.uniforms.uMouse.value = [
			this.mouse.delayedMousePos.x,
			this.mouse.delayedMousePos.y
		]
	}
}
