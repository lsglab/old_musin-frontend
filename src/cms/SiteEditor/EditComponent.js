import Img from './Inputs/Img';
import Link from './Inputs/Link';
import LongText from './Inputs/LongText';
import ShortText from './Inputs/ShortText';

export default class EditComponent {
	constructor(component = undefined, parent = undefined) {
		this.component = component;
		this.blueprint = {};
		this.children = [];
		this.childrenTypes = [];
		this.props = {};
		this.parent = parent;
		this.slot = false;
		this.saving = false;
	}

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

	eachChildren(callback) {
		this.children.forEach((child, i) => {
			callback(child, i);
		});
	}

	save(document) {
		this.saving = true;

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

		this.eachChildren((child) => {
			data.children.push(child.save(document));
		});
		return data;
	}

	prepareInput(document) {
		this.saving = false;
		this.eachChildren((child) => {
			child.prepareInput(document);
		});
	}

	createFromData(data, components, parent = null) {
		function createBlueprint(blueprint) {
			function create(object) {
				object.createFromData(blueprint);
				return object;
			}

			switch (blueprint.type) {
				case 'img':
					return create(new Img());
				case 'link':
					return create(new Link());
				case 'shortText':
					return create(new ShortText());
				case 'longText':
					return create(new LongText());
				default:
			}

			return false;
		}

		this.component = components.find((ele) => {
			return ele.name === data.componentName;
		});

		this.children = data.children;
		this.childrenTypes = data.childrenTypes;
		this.props = data.props;
		this.parent = parent;
		this.slot = data.slot;

		Object.keys(data.blueprint).forEach((key) => {
			this.blueprint[key] = createBlueprint(data.blueprint[key]);
		});

		this.childrenTypes.forEach((type, i) => {
			if (i === 0) this.blueprint.children = [];
			const component = components.find((comp) => comp.name === type);
			this.blueprint.children.push(component);
		});

		this.children = this.children.map((child) => {
			return new EditComponent().createFromData(child, components, this);
		});

		return this;
	}
}
