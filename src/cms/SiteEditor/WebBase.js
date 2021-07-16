/* eslint-disable no-bitwise */
export default class WebBase {
	constructor() {
		this.createUUID();
	}

	createUUID() {
		// this should provide a certain level of uniqueness
		this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
}
