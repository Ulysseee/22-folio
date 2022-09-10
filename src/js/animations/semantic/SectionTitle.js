import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

import Animation from '@js/Animation.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element.firstElementChild, {
			types: 'words',
			tagName: 'span'
		})
		gsap.set(this.splitedElement.words, {
			y: '180%',
			rotate: 15
		})
		gsap.set(this.element.lastElementChild, {
			scaleX: 0,
		})
	}

	animateIn() {
		gsap.timeline()
			.to(this.element.lastElementChild, {
				scaleX: 1,
				duration: 0.85,
				delay: 0.3,
				ease: Power3.easeInOut
			})
			.to(this.splitedElement.words, {
				y: 0,
				rotate: 0,
				stagger: 0.1,
				delay: this.delay ? this.delay : -0.5,
				ease: Power3.inOut
			})
	}
}
