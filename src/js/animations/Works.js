import WorksTrail from './WorksTrail.js'

export default class Works {
	constructor(el) {
		this.menuItemsList = document.querySelectorAll('.works__heading')
		this.animatableProperties = {
			// translationX
			tx: { previous: 0, current: 0, amt: 0.08 },
			// translationY
			ty: { previous: 0, current: 0, amt: 0.08 },
			// Rotation angle
			rotation: { previous: 0, current: 0, amt: 0.05 },
			// CSS filter (brightness) value
			brightness: { previous: 1, current: 1, amt: 0.05 }
		}
		// array of MenuItem instances
		this.menuItems = []
		;[...this.menuItemsList].forEach((item, pos) => {
			this.menuItems.push(
				new WorksTrail(item, pos, this.animatableProperties)
			)
		})
	}
}
