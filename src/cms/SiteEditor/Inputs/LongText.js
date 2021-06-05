import Base from './Base';

export default class Link extends Base {
	constructor(placeholder = 'https://example.com') {
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
				console.log(editor);
			})
			.catch((error) => {
				console.error('Error occured creating editor', error);
			});
	}
}
