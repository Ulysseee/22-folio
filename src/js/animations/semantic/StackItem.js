import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.setItem()
	}

	setItem() {
		gsap.set(this.element, {
			y: '105%',
			opacity: 0
		})
	}

	animateIn() {
		gsap.to(this.element, {
			y: 0,
			opacity: 0.5,
			duration: 0.8,
			delay: this.delay ? this.delay : 0,
			ease: Power3.inOut
		})
	}
}
