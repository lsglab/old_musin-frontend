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
		ele.classList.add('input-outline');
	}

	save(document) {
		const node = document.getElementById(this.id);
		this.data = node.innerText;
		return super.save(document);
	}

	deleteInput(document) {
		const ele = document.getElementById(this.id);
		ele.contentEditable = false;
		ele.contenteditable = false;
		ele.classList.remove('input-outline');
	}
}
