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

		// gsap.set(this.splitedElement.chars, {
		// 	y: '100%'
		// })
	}

	animateIn() {
		gsap.timeline()
			.from(this.splitedElement.chars, {
				y: '100%',
				skewX: 20,
				duration: 0.8,
				stagger: {
					each: 0.02,
					from: 'start'
				},
				delay: 0.9,
				ease: Power3.easeInOut
			})
			.to(this.splitedElement.chars, {
				y: '-120%',
				duration: 0.8,
				stagger: {
					each: 0.02,
					from: 'end'
				},
				delay: 0.8,
				ease: Power3.easeInOut
			})
		gsap.timeline({ delay: 2.8 })
			.to('.loader__overlay path', {
				duration: 0.7,
				ease: Power2.easeIn,
				attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
			})
			.to('.loader__overlay path', {
				duration: 0.9,
				ease: Power2.easeOut,
				attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
			})
	}
}
