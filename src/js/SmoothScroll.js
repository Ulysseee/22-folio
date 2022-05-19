import EventEmitter from '@utils/EventEmitter'
import gsap from 'gsap'

export default class SmoothScroll extends EventEmitter {
	constructor({ element, viewport, scroll }) {
		super()

		this.element = element
		this.viewport = viewport
		this.scroll = scroll

		this.elements = {
			scrollContent: this.element.querySelector('.scroll__content')
		}

		window.addEventListener('mousewheel', () => {
			this.trigger('scroll')
		})

		setTimeout(() => {
			this.resize()
		}, 500)
	}

	setSizes() {
		this.scroll.height =
			this.elements.scrollContent.getBoundingClientRect().height
		this.scroll.limit =
			this.elements.scrollContent.clientHeight - this.viewport.height

		document.body.style.height = `${this.scroll.height}px`
	}

	update() {
		this.scroll.hard = window.scrollY
		this.scroll.hard = gsap.utils.clamp(
			0,
			this.scroll.limit,
			this.scroll.hard
		)
		this.scroll.soft = gsap.utils.interpolate(
			this.scroll.soft,
			this.scroll.hard,
			this.scroll.ease
		)

		if (this.scroll.soft < 0.01) {
			this.scroll.soft = 0
		}

		this.elements.scrollContent.style.transform = `translateY(${-this.scroll
			.soft}px)`
	}

	resize() {
		this.viewport = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		this.setSizes()
	}
}
