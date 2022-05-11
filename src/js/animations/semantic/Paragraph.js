import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

import Photo from '../Photo'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'words'
			// tagName: 'span'
		})

		if (this.me) this.wrapp(this.splitedElement.words[2])

		gsap.set(this.splitedElement.words, {
			y: '105%',
			opacity: 0
		})
	}

	wrapp(el) {
		el.innerHTML = `
			<a class="menu__item" data-img="img/1.jpg">
				<span class="menu__item-text"><span class="menu__item-textinner">Ulysse,</span></span>
			</a>
		`
		new Photo()
	}

	animateIn() {
		gsap.to(this.splitedElement.words, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			stagger: 0.02,
			delay: this.delay ? this.delay : 0,
			ease: Power3.inOut
		})
	}
}
