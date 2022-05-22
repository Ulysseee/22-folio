import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.title = element.querySelector('.works__heading > h3')
		this.description = element.querySelector('.works__description')
		this.soon = element.querySelector('.works__soon')

		this.splitText()
	}

	splitText() {
		this.splitedTitle = new SplitType(this.title, {
			types: 'words',
			tagName: 'span'
		})
		this.splitedDescription = new SplitType(this.description, {
			types: 'words'
		})
		gsap.set(this.splitedTitle.words, {
			y: '150%',
			opacity: 0
		})
		gsap.set(this.splitedDescription.words, {
			y: '105%',
			opacity: 0
		})
		if (this.soon)
			gsap.set(this.soon, {
				opacity: 0,
				scale: 0
			})
	}

	animateIn() {
		let timeline = gsap.timeline({ delay: this.delay ? this.delay : 0 })
		timeline
			.to(this.splitedTitle.words, {
				y: 0,
				opacity: 1,
				stagger: 0.1,
				ease: Power3.inOut
			})
			.to(this.splitedDescription.words, {
				y: 0,
				opacity: 1,
				stagger: 0.015,
				ease: Power3.inOut
			})

		if (this.soon)
			timeline.to(this.soon, {
				opacity: 1,
				scale: 1,
				duration: 0.4,
				ease: Power3.inOut,
				delay: -1.3
			})
	}
}
