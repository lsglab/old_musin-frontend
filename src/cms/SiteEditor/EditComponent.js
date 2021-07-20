import Component from './Component';

export default class EditComponent extends Component {
	deleteChild(child) {
		const find = this.children.indexOf(child);

		if (find !== undefined) {
			this.children.splice(find, 1);
		}
	}

	blueprintKeys(callback) {
		const keys = Object.keys(this.blueprint);
		keys.forEach((key) => {
			if (key !== 'children') {
				callback(key);
			}
		});
	}

	save(document) {
		const data = {
			blueprint: {},
			children: [],
			childrenTypes: this.childrenTypes,
			componentName: this.component.name,
			props: this.props,
			slot: this.slot,
		};

		this.blueprintKeys((key) => {
			console.log('save blueprints', key, 'name', this.component.name);
			data.blueprint[key] = this.blueprint[key].save(document);
		});

		this.children.forEach((child) => {
			data.children.push(child.save(document));
		});
		return data;
	}

	prepareInput(document) {
		this.children.forEach((child) => {
			child.prepareInput(document);
		});
	}
}
