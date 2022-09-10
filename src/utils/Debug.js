import { Pane } from 'tweakpane'

import Stats from '../utils/Stats'

export default class Debug {
	constructor() {
		if (Debug._instance) {
			return Debug._instance
		}

		Debug._instance = this

		this.gui = new Pane({
			title: 'Settings',
			expanded: true
		})

		this.stats = new Stats(true)
	}
}
