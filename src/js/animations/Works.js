import WorksTrail from './WorksTrail'

export default class Works {
	constructor(el) {
		console.log('HERE')
		this.menuItemsList = document.querySelectorAll('.works__heading-text')
		this.animatableProperties = {
			// translationX
			tx: { previous: 0, current: 0, amt: 0.08 },
			// translationY
			ty: { previous: 0, current: 0, amt: 0.08 },
			// Rotation angle
			rotation: { previous: 0, current: 0, amt: 0.08 },
			// CSS filter (brightness) value
			brightness: { previous: 1, current: 1, amt: 0.08 }
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
