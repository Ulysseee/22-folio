import { gsap } from 'gsap'
// import MenuItem from './menuItem'
import MotionTrail from './MotionTrail'

export default class Motion {
	constructor(el) {
		this.menuItemsList = document.querySelectorAll('.menu__item')

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
				new MotionTrail(item, pos, this.animatableProperties)
			)
		})
		console.log('HERE', this.menuItems)
	}
}
