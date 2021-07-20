import Img from './Inputs/Img';
import Link from './Inputs/Link';
import LongText from './Inputs/LongText';
import ShortText from './Inputs/ShortText';
import WebBase from './WebBase';

export default class Component extends WebBase {
	constructor(component = undefined, parent = undefined) {
		super();
		this.component = component;
		this.blueprint = {};
		this.children = [];
		this.childrenTypes = [];
		this.props = {};
		this.parent = parent;
		this.slot = false;
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
			return new Component().createFromData(child, components, this);
		});

		return this;
	}
}
