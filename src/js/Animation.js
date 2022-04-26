export default class {
	constructor({ element }) {
		const { animationDelay } = element.dataset

		this.element = element
		this.delay = animationDelay

		this.createObserver()
	}

	createObserver() {
		this.observer = new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.animateIn()
				}
			})
		}).observe(this.element)
	}
}
