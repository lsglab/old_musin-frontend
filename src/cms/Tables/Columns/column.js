import { toLocalDateString } from '../../Utils/time';
import Base from '../../Base';

export default class Column extends Base {
	constructor(object) {
		super();
		this.assign(object, 'table');
		this.assign(object, 'name');
		this.assign(object, 'type');
		this.assign(object, 'unique');
		this.assign(object, 'required');
		this.assign(object, 'identifier');
		this.assign(object, 'hidden');
		this.assign(object, 'fillable');
		this.assign(object, 'isDisplayValue');
		this.assign(object, 'default');
		this.assign(object, 'enum');
		this.setInputType();
		this.setAutocomplete();
	}

	setInputType() {
		switch (this.type) {
			case 'boolean':
				this.inputType = 'radio';
				break;
			default:
				this.inputType = this.type;
				break;
		}
	}

	setAutocomplete() {
		switch (this.type) {
			case 'password':
				this.autocomplete = 'new-password';
				break;
			default:
				this.autocomplete = 'off';
				break;
		}
	}

	modifyData(ele) {
		const data = ele;
		switch (this.type) {
			case 'password':
				data.password_confirmation = data[this.name];
				return data;
			default:
				return data;
		}
	}

	setDisplayData(ele) {
		const data = ele;
		switch (this.type) {
			case 'date':
			case 'timestamp':
				data[this.name] = toLocalDateString(data[this.name], {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				});
				return data;
			default:
				return data;
		}
	}
}
