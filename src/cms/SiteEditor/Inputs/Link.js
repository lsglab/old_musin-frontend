import Base from './Base';
import EditLink from '../../../components/cms/molecules/EditLink.svelte';

export default class Link extends Base {
	constructor(placeholder = 'Link', hrefPlaceholder = 'https://example.com') {
		super(placeholder);
		this.type = 'link';
		this.href = hrefPlaceholder;
	}

	newLink(node, id) {
		return new EditLink({
			props: {
				href: this.href,
				id,
				placeholder: this.placeholder,
			},
			target: node,
		});
	}

	prepareInput(document) {
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

		function close() {
			editLink.$set({ visible: false });
			closing = true;
		}

		editLink.$on('close', () => {
			close();
		});

		editLink.$on('save', (e) => {
			this.href = e.detail.href;
			this.placeholder = e.detail.placeholder;
			atag.href = this.href;
			atag.firstChild.nodeValue = this.placeholder;
			close();
		});
	}
}
