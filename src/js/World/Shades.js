import * as THREE from 'three'
import MainScene from '../MainScene.js'

import shadesFrag from '@shaders/shades.frag'
import shadesVert from '@shaders/shades.vert'

export default class Shades {
	constructor() {
		this.MainScene = new MainScene()
		this.scene = this.MainScene.scene
		this.debug = this.MainScene.debug
		this.time = this.MainScene.time

		this.settings = {
			// uBaseFirst: '#98a5da',
			// uBaseSecond: '#5a6491',
			// uAccent: '#112d9e'
			// #463733,
			// #6c7e86,
			// #86716c
			// uBaseFirst: '#ffe0d9',
			// uBaseSecond: '#fe3301',
			// uAccent: '#f19c87',
			uBaseFirst: '#f7efe3',
			uBaseSecond: '#fe3301',
			uAccent: '#5c6c73'
		}

		this.tCol = {
			baseFirst: new THREE.Color(),
			baseSecond: new THREE.Color(),
			accent: new THREE.Color()
		}

		const color2 = new THREE.Color(this.settings.baseFirst)

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
				uAccent: { value: this.tCol.accent.set(this.settings.uAccent) }
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
	}
}
