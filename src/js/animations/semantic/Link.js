import gsap, { Power3 } from 'gsap'
import SplitType from 'split-type'

import Animation from '../../Animation.js'

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

	initEvents() {
		this.element.parentNode.addEventListener('mouseenter', () =>
			this.enter()
		)
		this.element.parentNode.addEventListener('mouseleave', () =>
			this.leave()
		)
	}

	async animateIn() {
		await gsap.to(this.splitedElement.chars, {
			y: '0',
			stagger: {
				amount: 0.6
			},
			ease: Power3.easeOut
		})

		this.initEvents()
	}

	enter() {
		gsap.killTweensOf(this.splitedElement.chars)
		gsap.killTweensOf(this.spliteClonedElement.chars)

		gsap.timeline()
			.to(this.splitedElement.chars, {
				y: '-100%',
				stagger: {
					amount: 0.2
				},
				ease: Power3.easeIn
			})
			.to(this.spliteClonedElement.chars, {
				y: 0,
				stagger: {
					amount: 0.2
				},
				delay: -0.4,
				ease: Power3.easeOut
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
				ease: Power3.easeIn
			})
			.to(this.splitedElement.chars, {
				y: 0,
				stagger: {
					amount: 0.2,
					from: 'end'
				},
				delay: -0.4,
				ease: Power3.easeOut
			})
	}
}
