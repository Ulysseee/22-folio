import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

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
		gsap.timeline()
			.to(this.splitedElement.chars, {
				y: '-100%',
				rotationX: -90,
				stagger: 0.02,
				ease: Power2.easeOut
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				stagger: 0.02,
				delay: -0.6,
				ease: Power2.easeOut
			})
	}

	leave() {
		gsap.timeline()
			.to(this.spliteClonedElement.chars, {
				y: '100%',
				stagger: {
					each: 0.02,
					from: 'end'
				},
				ease: Power2.easeOut
			})
			.to(this.splitedElement.chars, {
				y: 0,
				rotationX: 0,
				stagger: {
					each: 0.02,
					from: 'end'
				},
				delay: -0.6,
				ease: Power2.easeOut
			})
	}
}
