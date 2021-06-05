export default class EditComponent {
	constructor(component, parent) {
		this.component = component;
		this.children = [];
		this.props = {};
		this.parent = parent;
		this.slot = false;
	}

	deleteChild(child) {
		const find = this.children.indexOf(child);

		if (find !== undefined) {
			this.children.splice(find, 1);
		}
	}
}
