import gsap, { Power3, Power2, Circ } from 'gsap'
import SplitType from 'split-type'
import { enableScroll } from '@utils/Dom'

import Animation from '@js/Animation.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'chars, words',
			tagName: 'span'
		})

		gsap.set('.nav-w__state-off', {
			scaleX: 0
		})
		gsap.set(this.splitedElement.chars, {
			y: '100%',
			rotate: -20,
		})
	}

	animateIn() {
		this.tl = gsap.timeline({
			delay: 0.2,
			onComplete: () => {
				enableScroll()
			}
		})
			.to(this.splitedElement.chars, {
				y: 0,
				rotate: 0,
				stagger: 0.04,
				ease: Circ.easeOut
			})
			.to(this.splitedElement.chars, {
				y: '-120%',
				stagger: {
					each: 0.02,
					from: 'end'
				},
				delay: 0.2,
				ease: Circ.easeIn
			})
			.to('.loader__overlay path', {
				duration: 0.7,
				ease: Power2.easeIn,
				delay: -0.3,
				attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
			})
			.to('.loader__overlay path', {
				duration: 0.9,
				delay: -0.1,
				ease: Power2.easeOut,
				attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
			})
			.to('.nav-w__state-off', {
				scaleX: 1,
				duration: 0.8,
				delay: -0.2,
				ease: Power3.easeInOut
			})
	}
}
