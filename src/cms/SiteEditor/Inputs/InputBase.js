import WebBase from '../WebBase';

export default class InputBase extends WebBase {
	constructor(placeholder = '') {
		super();
		this.placeholder = placeholder;
		this.data = this.placeholder;
		this.type = 'base';
	}

	save() {
		// this.deleteInput(document);
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
