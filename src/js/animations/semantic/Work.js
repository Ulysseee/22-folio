import Animation from '@js/Animation'
import MainScene from '@js/MainScene'

import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.MainScene = new MainScene()
		this.sizes = this.MainScene.sizes

		console.log(this.sizes)

		this.title = element.querySelector('.works__heading-top')
		this.date = element.querySelector('.works__description > span')
		this.description = element.querySelector('.works__description > p')
		this.soon = element.querySelector('.works__banner')

		this.splitText()
	}

	splitText() {
		this.splitedTitle = new SplitType(this.title, {
			types: 'words',
			tagName: 'span'
		})
		this.splitedClonedTitle = new SplitType(this.title.nextElementSibling, {
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
		gsap.set(this.splitedClonedTitle.words, {
			y: this.sizes.width > 768 ? 190 : 300
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

	initEvents() {
		this.title.parentNode.addEventListener('mouseenter', () => this.enter())
		this.title.parentNode.addEventListener('mouseleave', () => this.leave())
	}

	async animateIn() {
		let timeline = gsap.timeline({ delay: this.delay ? this.delay : 0 })
		await timeline.to(this.splitedTitle.words, {
			y: 0,
			opacity: 1,
			stagger: 0.1,
			ease: Power3.inOut
		})

		this.initEvents()

		timeline.to(this.splitedDescription.words, {
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
				delay: -1
			})
	}

	enter() {
		gsap.killTweensOf(this.splitedTitle.words)
		gsap.killTweensOf(this.splitedClonedTitle.words)

		gsap.timeline()
			.to(this.splitedTitle.words, {
				y: this.sizes.width > 768 ? -190 : -300,
				stagger: 0.035,
				ease: Power3.easeIn
			})
			.to(this.splitedClonedTitle.words, {
				y: 0,
				stagger: 0.035,
				delay: -0.175,
				ease: Power3.easeOut
			})
	}

	leave() {
		gsap.killTweensOf(this.splitedTitle.words)
		gsap.killTweensOf(this.splitedClonedTitle.words)

		gsap.timeline()
			.to(this.splitedClonedTitle.words, {
				y: this.sizes.width > 768 ? 190 : 300,
				stagger: {
					each: 0.035,
					from: 'end'
				},
				ease: Power3.easeIn
			})
			.to(this.splitedTitle.words, {
				y: 0,
				stagger: {
					each: 0.035,
					from: 'end'
				},
				delay: -0.175,
				ease: Power3.easeOut
			})
	}
}
