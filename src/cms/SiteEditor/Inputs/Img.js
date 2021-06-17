import Base from './Base';
import SelectMedia from '../../../components/cms/organisms/SelectMedia.svelte';

export default class Img extends Base {
	constructor(placeholder = 'https://www2.tuhh.de/zll/wp-content/uploads/placeholder.png') {
		super(placeholder);
		this.type = 'img';
		this.description = '';
	}

	prepareInput(document, triggerUpdate) {
		const img = document.getElementById(this.id);
		const selectMedia = new SelectMedia({
			props: {},
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
}
