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
			types: 'words'
		})
		gsap.set(this.splitedElement.words, {
			y: '100%'
		})
	}

	animateIn() {
		gsap.to(this.splitedElement.words, {
			y: '0',
			duration: 0.4,
			stagger: 0.08,
			delay: this.delay ? this.delay : 0,
			ease: Power3.easeInOut
		})
	}
}
