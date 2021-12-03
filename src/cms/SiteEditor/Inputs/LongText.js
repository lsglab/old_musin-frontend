import InputBase from './InputBase';
import '../../../assets/cms/styles/ckeditor.css';

export default class LongText extends InputBase {
	constructor(placeholder = 'Long Text') {
		super(placeholder);
		this.type = 'longText';
	}

	async prepareInput(document) {
		const module = await import('@ckeditor/ckeditor5-build-inline');

		const inlineEditor = module.default;
		const node = document.getElementById(this.id);

		inlineEditor
			.create(node)
			.then((editor) => {
				this.editor = editor;
				this.editor.setData(this.data);
			})
			.catch((error) => {
				console.error('Error occured creating editor', error);
			});
	}

	save(document) {
		this.data = this.editor.getData();
		return super.save(document);
	}

	deleteInput() {
		this.editor.destroy();
	}
}
