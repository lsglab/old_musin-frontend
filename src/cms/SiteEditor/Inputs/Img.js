import InputBase from './InputBase';
import SelectMedia from '../../../components/cms/organisms/SelectMedia.svelte';

export default class Img extends InputBase {
	constructor(placeholder = 'https://www2.tuhh.de/zll/wp-content/uploads/placeholder.png') {
		super(placeholder);
		this.type = 'img';
		this.description = '';
		this.selectMediaID = `edit-${this.id}`;
	}

	prepareInput(document, triggerUpdate) {
		const img = document.getElementById(this.id);
		const selectMedia = new SelectMedia({
			props: {
				id: this.selectMediaID,
			},
			target: document.getElementById('app'),
		});

		img.addEventListener('click', (e) => {
			e.preventDefault();

			selectMedia.$set({ visible: true });
		});

		selectMedia.$on('selected', (e) => {
			const file = e.detail;
			this.data = `${process.globals.apiServer}/${file.url}`;
			this.description = file.description;
			triggerUpdate();
		});
	}

	save(document) {
		const data = super.save(document);
		data.description = this.description;
		data.selectMediaID = this.selectMediaID;
		return data;
	}

	deleteInput(document) {
		document.getElementById(this.selectMediaID).remove();
	}
}
