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
			opacity: 0
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
				duration: 0.5,
				opacity: 0,
				stagger: 0.025,
				ease: Power2
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				opacity: 1,
				stagger: 0.025,
				delay: -0.6,
				duration: 0.5,
				ease: Power2
			})
	}

	leave() {
		gsap.timeline()
			.to(this.splitedElement.chars, {
				y: 0,
				rotationX: 0,
				duration: 0.5,
				opacity: 1,
				stagger: 0.025,
				ease: Power2
			})
			.to(this.spliteClonedElement.chars, {
				y: '100%',
				opacity: 0,
				stagger: 0.025,
				delay: -0.6,
				duration: 0.5,
				ease: Power2
			})
	}
}
