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
			types: 'chars',
			tagName: 'span'
		})
		gsap.set(this.splitedElement.chars, {
			y: '100%'
		})
	}

	animateIn() {
		gsap.to(this.splitedElement.chars, {
			y: 0,
			duration: 0.8,
			stagger: 0.04,
			delay: this.delay ? this.delay : 0,
			ease: Power3.inOut
		})
	}
}
