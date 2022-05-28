import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

import Animation from '@js/Animation.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()

		// this.element.parentNode.parentNode.addEventListener('mouseenter', () =>
		// 	this.enter()
		// )
		// this.element.parentNode.parentNode.addEventListener('mouseleave', () =>
		// 	this.leave()
		// )
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'words, chars',
			tagName: 'span'
		})
		gsap.set(this.splitedElement.words, {
			y: '150%'
		})
	}

	animateIn() {
		gsap.timeline().to(this.splitedElement.words, {
			y: 0,
			delay: this.delay ? this.delay : -0.5,
			ease: Power3.inOut
		})
	}

	enter() {
		gsap.timeline({ overwite: false })
			.to(this.splitedElement.chars, {
				y: '-100%',
				stagger: 0.02,
				ease: Power3.easeInOut
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				stagger: 0.02,
				delay: -0.8,
				ease: Power3.easeInOut
			})
	}

	leave() {
		gsap.timeline({ overwite: false })
			.to(this.splitedElement.chars, {
				y: 0,
				stagger: {
					each: 0.02,
					from: 'end'
				},
				ease: Power3.easeInOut
			})
			.to(this.spliteClonedElement.chars, {
				y: '100%',
				stagger: {
					each: 0.02,
					from: 'end'
				},
				delay: -0.8,
				ease: Power3.easeInOut
			})
	}
}
