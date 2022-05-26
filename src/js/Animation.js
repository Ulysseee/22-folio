export default class {
	constructor({ element }) {
		const { animationDelay, me } = element.dataset

		this.element = element
		this.delay = animationDelay

		if (me === 'true') this.me = true

		this.createObserver()
	}

	createObserver() {
		this.observer = new IntersectionObserver(this.onIntersection)
		this.observer.observe(this.element)
	}

	onIntersection = async (entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				await this.animateIn()
				this.observer.unobserve(this.element)
			}
		}
	}
}
