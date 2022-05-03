export default class {
	constructor({ element }) {
		const { animationDelay } = element.dataset

		this.element = element
		this.delay = animationDelay

		this.createObserver()
	}

	createObserver() {
		this.observer = new IntersectionObserver(this.onIntersection)
		this.observer.observe(this.element)
	}

	onIntersection = (entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.animateIn()
				this.observer.unobserve(this.element)
			}
		}
	}
}
