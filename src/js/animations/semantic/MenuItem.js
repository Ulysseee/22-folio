import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

import Animation from '@js/Animation.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()

		element.parentNode.addEventListener('mouseenter', () => this.enter())
		element.parentNode.addEventListener('mouseleave', () => this.leave())
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'words, chars',
			tagName: 'span'
		})
		this.spliteClonedElement = new SplitType(
			this.element.nextElementSibling,
			{
				types: 'words, chars',
				tagName: 'span'
			}
		)
		gsap.set(this.splitedElement.words, {
			y: '100%'
		})
		gsap.set(this.spliteClonedElement.chars, {
			y: '100%',
			opacity: 1
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

	enter() {
		gsap.killTweensOf(this.splitedElement.char)
		gsap.killTweensOf(this.spliteClonedElement.chars)

		gsap.timeline()
			.to(this.splitedElement.chars, {
				y: '-100%',
				rotationX: -90,
				stagger: {
					amount: 0.2
				},
				ease: Power2.easeIn
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				stagger: {
					amount: 0.2
				},
				delay: -0.4,
				ease: Power2.easeOut
			})
	}

	leave() {
		gsap.killTweensOf(this.splitedElement.char)
		gsap.killTweensOf(this.spliteClonedElement.chars)

		gsap.timeline()
			.to(this.spliteClonedElement.chars, {
				y: '100%',
				stagger: {
					amount: 0.2,
					from: 'end'
				},
				ease: Power2.easeIn
			})
			.to(this.splitedElement.chars, {
				y: 0,
				rotationX: 0,
				stagger: {
					amount: 0.2,
					from: 'end'
				},
				delay: -0.4,
				ease: Power3.easeOut
			})
	}
}
