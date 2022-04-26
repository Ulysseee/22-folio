import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'chars'
		})
	}

	animateIn() {
		gsap.timeline({ delay: 3.4 }).from(this.splitedElement.chars, {
			y: '100%',
			duration: 0.8,
			stagger: 0.04,
			ease: Power3.inOut
		})
	}
}
