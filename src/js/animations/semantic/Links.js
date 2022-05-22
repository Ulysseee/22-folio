import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()

		this.element.parentNode.addEventListener('mouseenter', () =>
			this.enter()
		)
		this.element.parentNode.addEventListener('mouseleave', () =>
			this.leave()
		)
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'chars',
			tagName: 'span'
		})
		this.spliteClonedElement = new SplitType(
			this.element.nextElementSibling,
			{
				types: 'chars',
				tagName: 'span'
			}
		)
		gsap.set([this.splitedElement.chars, this.spliteClonedElement.chars], {
			y: '100%'
		})
	}

	animateIn() {
		gsap.to(this.splitedElement.chars, {
			y: '0',
			stagger: {
				amount: 0.6
			},
			ease: Power3.easeOut
		})
	}

	enter() {
		gsap.timeline({ overwite: false })
			.to(this.splitedElement.chars, {
				y: '-100%',
				stagger: 0.015,
				ease: Power3.easeInOut
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				stagger: 0.015,
				delay: -0.7,
				ease: Power3.easeInOut
			})
	}

	leave() {
		gsap.timeline({ overwite: false })
			.to(this.splitedElement.chars, {
				y: 0,
				stagger: {
					each: 0.015,
					from: 'end'
				},
				ease: Power3.easeInOut
			})
			.to(this.spliteClonedElement.chars, {
				y: '100%',
				stagger: {
					each: 0.015,
					from: 'end'
				},
				delay: -0.8,
				ease: Power3.easeInOut
			})
	}
}
