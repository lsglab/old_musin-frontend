import Base from './Base';

export default class LongText extends Base {
	constructor(placeholder = 'Long Text') {
		super(placeholder);
		this.type = 'longText';
	}

	async prepareInput(document) {
		console.log('preparing long text input');
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
