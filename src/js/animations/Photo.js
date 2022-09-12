import PhotoTrail from './PhotoTrail.js'

export default class Photo {
	constructor(el) {
		this.menuItemsList = document.querySelectorAll('.me__pp')
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
				new PhotoTrail(item, pos, this.animatableProperties)
			)
		})
	}
}
