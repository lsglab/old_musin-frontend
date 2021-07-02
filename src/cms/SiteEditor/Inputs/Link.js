import Base from './Base';
import EditLink from '../../../components/cms/molecules/EditLink.svelte';

export default class Link extends Base {
	constructor(placeholder = 'Link', hrefPlaceholder = 'https://example.com') {
		super(placeholder);
		this.type = 'link';
		this.href = hrefPlaceholder;
		this.editLinkID = `edit-${this.id}`;
	}

	newLink(node, id, document) {
		return new EditLink({
			props: {
				data: this.data,
				document,
				href: this.href,
				id,
			},
			target: node,
		});
	}

	prepareInput(document, triggerUpdate) {
		const atag = document.getElementById(this.id);

		const editLink = this.newLink(atag, this.editLinkID, document);

		let closing = false;

		atag.addEventListener('click', (e) => {
			e.preventDefault();
			document.getElementById(this.editLinkID);
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
			this.data = e.detail.data;
			triggerUpdate();
			close();
		});
	}

	save(document) {
		const data = super.save(document);
		data.href = this.href;
		data.editLinkID = this.editLinkID;
		return data;
	}

	deleteInput(document) {
		document.getElementById(this.editLinkID).remove();
	}
}
