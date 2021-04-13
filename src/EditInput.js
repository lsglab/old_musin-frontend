import EditLink from './components/cms/EditLink.svelte';

/* eslint-disable*/
export default class EditInput {
	constructor(type, placeholder) {
		this.type = type;
		this.placeholder = placeholder;
		this.data = placeholder;
		this.createUUID();
		this.href = '';
	}

	newLink(node, id) {
		return new EditLink({
			target: node,
			props: {
				placeholder: this.placeholder,
				id,
				href: this.href,
			},
		});
	}

	async newLongText(node) {
		const module = await import('@ckeditor/ckeditor5-build-inline');
		const inlineEditor = module.default;
		inlineEditor
			.create(node)
			.then((editor) => {
				console.log(editor);
			})
			.catch((error) => {
				console.error('Error occured creating editor', error);
			});
	}

	prepareInput(document) {
		console.log('preparing input', this.placeholder);
		switch (this.type) {
			case 'shortText':
				const ele = document.getElementById(this.id);
				console.log('ele', ele);
				ele.contentEditable = true;
				ele.contenteditable = true;
				break;
			case 'longText':
				this.newLongText(document.getElementById(this.id));
				break;
			case 'link':
				const editLinkId = `edit-${this.id}`;
				const atag = document.getElementById(this.id);
				const editLink = this.newLink(atag, editLinkId);

				let closing = false;

				atag.addEventListener('click', (e) => {
					e.preventDefault();
					document.getElementById(editLinkId);
					if (!closing) {
						editLink.$set({ visible: true });
					} else {
						closing = false;
					}
				});

				editLink.$on('close', (e) => {
					close();
				});

				editLink.$on('save', (e) => {
					this.href = e.detail.href;
					this.placeholder = e.detail.placeholder;
					atag.href = this.href;
					atag.firstChild.nodeValue = this.placeholder;
					close();
				});

				function close() {
					editLink.$set({ visible: false });
					closing = true;
				}

				break;
			default:
				this.data = this.placeholder;
		}
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
