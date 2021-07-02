/* eslint-disable no-bitwise */

export default class Base {
	constructor(placeholder = '') {
		this.placeholder = placeholder;
		this.data = this.placeholder;
		this.type = 'base';
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

	save(document) {
		this.deleteInput(document);
		return {
			data: this.data,
			id: this.id,
			placeholder: this.placeholder,
			type: this.type,
		};
	}

	createFromData(data) {
		Object.keys(data).forEach((key) => {
			this[key] = data[key];
		});
	}
}
