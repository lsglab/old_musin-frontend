import Base from './Base';

export default class ShortText extends Base {
	constructor(placeholder) {
		super(placeholder);
		this.type = 'shortText';
	}

	prepareInput(document) {
		const ele = document.getElementById(this.id);
		ele.contentEditable = true;
		ele.contenteditable = true;
	}
}
