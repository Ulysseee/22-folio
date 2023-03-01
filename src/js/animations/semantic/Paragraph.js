import gsap, { Power3 } from 'gsap'
import SplitType from 'split-type'

import Animation from '@js/Animation.js'
import Photo from '@js/Animations/Photo.js'

export default class extends Animation {
	constructor({ element }) {
		super({ element })

		this.splitText()
	}

	splitText() {
		this.splitedElement = new SplitType(this.element, {
			types: 'words',
		})

		if (this.me) this.wrapp(this.splitedElement.words[2])

		gsap.set(this.splitedElement.words, {
			// y: '105%',
			opacity: 0,
		})
	}

	wrapp(el) {
		el.innerHTML = `
			<div class="me__pp" data-img="img/1.jpg">
				<span class="me__pp-text"><span class="me__pp-textinner">Ulysse,</span></span>
			</div>
		`
		new Photo()
	}

	animateIn() {
		gsap.to(this.splitedElement.words, {
			// y: 0,
			opacity: 1,
			duration: 0.6,
			stagger: 0.02,
			delay: this.delay ? this.delay : 0,
			ease: Power3.inOut
		})
	}
}
