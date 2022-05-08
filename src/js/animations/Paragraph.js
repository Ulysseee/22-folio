import Animation from '@js/Animation'
import gsap, { Power3, Power2 } from 'gsap'
import SplitType from 'split-type'

import Motion from './Motion'

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

		new Motion()

		// // Initialize trail effect
		// new MotionTrail(document.querySelector('.trail'), {
		//     // perspective: false,
		//     totalTrailElements: 9,
		//     valuesFromTo: {
		//         x: [-200,200],
		//         y: [-70,70],
		//         rx: [0,0],
		//         ry: [0,0],
		//         rz: [-10,10]
		//     },
		//     opacityChange: true,
		//     // amt: pos => 0.02*pos + 0.05,
		//     // amtMain: 0.3
		// });
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
