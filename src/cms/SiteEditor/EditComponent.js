import Component from './Component';

export default class EditComponent extends Component {
	constructor(component, parent, componentName) {
		super(component, parent, componentName);
		this.initialized = false;
	}

	deleteChild(child) {
		const find = this.children.indexOf(child);

		if (find !== undefined) {
			this.children.splice(find, 1);
		}
	}

	save(document, removeCustomComponents = true) {
		if (this.isCustomComponent && removeCustomComponents === true) {
			const data = {
				children: [],
				id: this.customComponent.id,
				isCustomComponent: this.isCustomComponent,
			};

			if (this.customComponent.slot === true) {
				this.searchForComponent('Slot').children.forEach((child) => {
					data.children.push(child.save(document, removeCustomComponents));
				});
			}

			return data;
		}

		const data = {
			blueprint: {},
			children: [],
			childrenTypes: this.childrenTypes,
			componentName: this.component.name,
			props: this.props,
			slot: this.slot,
		};

		this.blueprintKeys((key) => {
			data.blueprint[key] = this.blueprint[key].save(document);
		});

		this.children.forEach((child) => {
			data.children.push(child.save(document, removeCustomComponents));
		});

		return data;
	}

	prepareInput(document, triggerUpdate) {
		if (this.isCustomComponent || this.belongsToCustomComponent) return;

		this.blueprintKeys((key) => {
			this.blueprint[key].prepareInput(document, triggerUpdate);
		});
	}

	// eslint-disable-next-line class-methods-use-this
	createNewInstance() {
		return new EditComponent();
	}
}
