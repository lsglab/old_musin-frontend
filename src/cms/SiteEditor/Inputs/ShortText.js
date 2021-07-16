import InputBase from './InputBase';

export default class ShortText extends InputBase {
	constructor(placeholder) {
		super(placeholder);
		this.type = 'shortText';
	}

	prepareInput(document, triggerUpdate) {
		const ele = document.getElementById(this.id);
		ele.contentEditable = true;
		ele.contenteditable = true;
		ele.classList.add('input-outline');

		ele.addEventListener(
			'input',
			() => {
				this.data = ele.innerText;
				triggerUpdate();
			},
			false
		);
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
