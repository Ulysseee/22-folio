import gsap, { Power3, Circ } from 'gsap'
import SplitType from 'split-type'

import Animation from '@js/Animation.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'words',
			tagName: 'span'
		})
		gsap.set(this.splitedElement.words, {
			y: '180%',
			rotate: 15
		})
	}

	animateIn() {
		gsap.to(this.splitedElement.words, {
			y: 0,
			rotate: 0,
			duration: 0.7,
			stagger: 0.08,
			delay: this.delay ? this.delay : 0,
			ease: Circ.easeOut
		})
	}
}
