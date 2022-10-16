import MainScene from '@js/MainScene.js'
import { lerp } from '@utils/Maths.js'

/**
 * Class representing a custom cursor.
 * A Cursor can have multiple elements/svgs
 */
export default class Cursor {
	// DOM elements
	DOM = {
		// cursor elements (SVGs .cursor)
		elements: null
	}
	// All CursorElement instances
	cursorElements = []

	/**
	 * Constructor.
	 * @param {NodeList} Dom_elems - all .cursor elements
	 * @param {String} triggerSelector - Trigger the cursor enter/leave method on the this selector returned elements. Default is all <a>.
	 */
	constructor(Dom_elems, triggerSelector = 'a') {
		this.DOM.elements = Dom_elems
		;[...this.DOM.elements].forEach((el) =>
			this.cursorElements.push(new CursorElement(el))
		)
		;[...document.querySelectorAll(triggerSelector)].forEach((trigger) => {
			trigger.addEventListener('mouseenter', () => this.enter())
			trigger.addEventListener('mouseleave', () => this.leave())
		})
	}
	/**
	 * Mouseenter event
	 */
	enter() {
		for (const el of this.cursorElements) {
			el.enter(false)
		}
	}
	workEnter() {
		for (const el of this.cursorElements) {
			el.enter(true)
		}
	}

	/**
	 * Mouseleave event
	 */
	leave() {
		for (const el of this.cursorElements) {
			el.leave(false)
		}
	}
	workLeave() {
		for (const el of this.cursorElements) {
			el.leave(true)
		}
	}
}

/**
 * Class representing a .cursor element
 */
class CursorElement {
	// DOM elements
	DOM = {
		// Main element (.cursor)
		el: null,
		// Inner element (.cursor__inner)
		inner: null
	}
	// Scales value when entering an <a> element
	scaleOnEnter = 1
	// Opacity value when entering an <a> element
	opacityOnEnter = 1
	// Element style properties
	renderedStyles = {
		// With interpolation, we can achieve a smooth animation effect when moving the cursor.
		// The "previous" and "current" values are the values that will interpolate.
		// The returned value will be one between these two (previous and current) at a specific increment.
		// The "amt" is the amount to interpolate.
		// As an example, the following formula calculates the x-axis translation value to apply to the cursor element:
		// this.renderedStyles.tx.previous = lerp(this.renderedStyles.tx.previous, this.renderedStyles.tx.current, this.renderedStyles.tx.amt);

		// translation, scale and opacity values
		// The lower the amt, the slower the cursor "follows" the user gesture
		tx: { previous: 0, current: 0, amt: 0.4 },
		ty: { previous: 0, current: 0, amt: 0.4 },
		// The scale and opacity will change when hovering over any element specified in [triggerSelector]
		// Defaults are 1 for both properties
		scale: { previous: 1, current: 1, amt: 0.2 },
		opacity: { previous: 1, current: 1, amt: 0.2 }
	}
	// Element size and position
	bounds

	/**
	 * Constructor.
	 */
	constructor(DOM_el) {
		this.MainScene = new MainScene()
		this.mouse = this.MainScene.mouse.clientMousePos

		this.DOM.el = DOM_el
		this.DOM.inner = this.DOM.el.querySelector('.cursor__inner')

		// Hide it initially
		this.DOM.el.style.opacity = 0

		// Calculate size and position
		this.bounds = this.DOM.el.getBoundingClientRect()

		// Check if any options passed in data attributes
		this.scaleOnEnter = this.DOM.el.dataset.scaleEnter || this.scaleOnEnter
		this.opacityOnEnter =
			this.DOM.el.dataset.opacityEnter || this.opacityOnEnter
		for (const key in this.renderedStyles) {
			this.renderedStyles[key].amt =
				this.DOM.el.dataset.amt || this.renderedStyles[key].amt
			this.renderedStyles[key].current =
				this.DOM.el.dataset.scale || this.renderedStyles[key].scale
		}

		// Show the element and start tracking its position as soon as the user moves the cursor.
		const onMouseMoveEv = () => {
			// Set up the initial values to be the same
			this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
				this.mouse.x - this.bounds.width / 2
			this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
				this.mouse.y - this.bounds.height / 2
			// Show it
			this.DOM.el.style.opacity = 1
			// Remove the initial mousemove event
			window.removeEventListener('mousemove', onMouseMoveEv)
		}
		window.addEventListener('mousemove', onMouseMoveEv)
	}

	/**
	 * Mouseenter event
	 * Scale up and fade out.
	 */
	enter() {
		this.renderedStyles['scale'].current = this.scaleOnEnter
		this.renderedStyles['opacity'].current = this.opacityOnEnter
	}

	/**
	 * Mouseleave event
	 * Reset scale and opacity.
	 */
	leave() {
		this.renderedStyles['scale'].current = 1
		this.renderedStyles['opacity'].current = 1
	}

	/**
	 * Loop / Interpolation
	 */
	render() {
		// New cursor positions
		this.renderedStyles['tx'].current = this.mouse.x - this.bounds.width / 2
		this.renderedStyles['ty'].current =
			this.mouse.y - this.bounds.height / 2

		// Interpolation
		for (const key in this.renderedStyles) {
			this.renderedStyles[key].previous = lerp(
				this.renderedStyles[key].previous,
				this.renderedStyles[key].current,
				this.renderedStyles[key].amt
			)
		}

		// Apply interpolated values (smooth effect)
		this.DOM.el.style.transform = `translateX(${this.renderedStyles['tx'].previous}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`
		this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous
	}
}
