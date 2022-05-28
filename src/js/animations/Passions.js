import PassionsTrail from './PassionsTrail.js'

export default class Passions {
	constructor(el) {
		this.menuItemsList = document.querySelectorAll('.passions__item')
		this.animatableProperties = {
			// translationX
			tx: { previous: 0, current: 0, amt: 0.08 },
			// translationY
			ty: { previous: 0, current: 0, amt: 0.08 },
			// Rotation angle
			rotation: { previous: 0, current: 0, amt: 0.04 },
			// CSS filter (brightness) value
			brightness: { previous: 1, current: 1, amt: 0.08 }
		}
		// array of MenuItem instances
		this.menuItems = []
		;[...this.menuItemsList].forEach((item, pos) => {
			this.menuItems.push(
				new PassionsTrail(item, pos, this.animatableProperties)
			)
		})
	}
}
