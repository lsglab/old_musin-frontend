/* eslint-disable no-param-reassign */
import Img from './Inputs/Img';
import Link from './Inputs/Link';
import LongText from './Inputs/LongText';
import ShortText from './Inputs/ShortText';
import WebBase from './WebBase';

export default class Component extends WebBase {
	constructor(component = undefined, parent = undefined, componentName = '') {
		super();
		this.component = component;
		this.blueprint = {};
		this.initialized = true;
		this.children = [];
		this.childrenTypes = [];
		this.props = {};
		this.parent = parent;
		this.slot = false;
		this.isCustomComponent = false;
		this.belongsToCustomComponent = false;
		this.customComponent = undefined;
		this.name = componentName;
	}

	blueprintKeys(callback) {
		const keys = Object.keys(this.blueprint);
		keys.forEach((key) => {
			if (key !== 'children') {
				callback(key);
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	createNewInstance() {
		return new Component();
	}

	setCustomComponent(customComponent) {
		this.isCustomComponent = true;
		this.customComponent = customComponent;
		this.name = customComponent.name;
	}

	searchForComponent(name) {
		for (let i = 0; i < this.children.length; i += 1) {
			const child = this.children[i];

			if (child.component.name === name) {
				return child;
			}

			const result = child.searchForComponent(name);

			if (result !== false) {
				return result;
			}
		}

		return false;
	}

	createFromData(data, components, customComponents, componentNames, parent = null) {
		let customComponentChildren = [];

		if (data.isCustomComponent === true) {
			const component = customComponents.find((ele) => ele.id === data.id);
			customComponentChildren = data.children;
			data = JSON.parse(component.blueprint);
			this.setCustomComponent(component);
		} else {
			const componentClassName = components.find((ele) => {
				return ele.name === data.componentName;
			}).name;

			this.name = componentNames.find((ele) => ele.component === componentClassName).name;
		}

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
			const created = this.createNewInstance().createFromData(
				child,
				components,
				customComponents,
				componentNames,
				this
			);
			created.belongsToCustomComponent = this.isCustomComponent || this.belongsToCustomComponent;
			return created;
		});

		if (this.isCustomComponent === true && this.customComponent.slot === true) {
			const slot = this.searchForComponent('Slot');
			slot.children = customComponentChildren.map((child) => {
				return this.createNewInstance().createFromData(
					child,
					components,
					customComponents,
					componentNames,
					slot
				);
			});
		}

		return this;
	}
}
