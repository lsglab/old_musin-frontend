<script>
	/* eslint-disable import/first */
	import { allCategories, allComponents } from '../../../cms/SiteEditor/Components';
	import { chooseComponent, compConfig } from '../../../stores';
	import { createEventDispatcher } from 'svelte';
	import ComponentCategory from '../molecules/ComponentCategory.svelte';
	import EditComponent from '../../../cms/SiteEditor/EditComponent';
	import Flex from '../../both/atoms/Flex.svelte';

	const dispatch = createEventDispatcher();

	export let customComponents = false;

	let visible = false;
	let parent;
	let childrenTypes = false;

	let categories = [];
	const components = $compConfig;

	chooseComponent.subscribe((value) => {
		if (value === false) {
			visible = false;
			return;
		}

		parent = value.parent;
		childrenTypes = parent.childrenTypes.length > 0;
		categories = JSON.parse(JSON.stringify(allCategories));

		if (childrenTypes) {
			categories.forEach((category) => {
				// eslint-disable-next-line no-param-reassign
				category.comps = category.comps.filter((comp) => parent.childrenTypes.includes(comp.component));
			});
		}

		visible = true;
	});

	function setChild(child) {
		parent.children.push(child);
		dispatch('update', {});
	}

	function componentChosen(e) {
		const component = components[e.detail.component.component];
		setChild(new EditComponent(component, parent, e.detail.component.name));
		chooseComponent.set(false);
	}

	function customComponentChosen(e) {
		const blueprint = JSON.parse(e.detail.component.blueprint);
		const component = new EditComponent();
		component.setCustomComponent(e.detail.component);
		component.createFromData(blueprint, $compConfig, customComponents, allComponents, parent);
		setChild(component);
		chooseComponent.set(false);
	}

	function mount(comps) {
		comps.forEach((component) => {
			window.document.addEventListener(
				'blueprint_iframe_mounted',
				() => {
					const blueprint = JSON.parse(component.blueprint);

					const event = new CustomEvent('create_blueprint', { detail: { blueprint, customComponents } });

					const ele = document.getElementById(component.name);

					if (ele !== null) {
						ele.contentDocument.dispatchEvent(event);
					}
				},
				false
			);
		});
	}
</script>

<style lang="scss">
	.visible {
		opacity: 1;
		pointer-events: auto;
		cursor: auto;
	}
</style>

<div
	class="absolute top-0 bottom-0 left-0 right-0 z-40 bg-black pointer-events-none opacity-0 {visible ? 'opacity-10 pointer-events-auto' : ''}"></div>
<div
	class:visible
	class="absolute z-50 p-5 bg-white rounded-md shadow-xl opacity-0 pointer-events-none left-56 right-56 top-14 bottom-14">
	<Flex classes="w-full" align="center" justify="between">
		<h4 class="font-light">Komponent wählen</h4>
		<div
			class="text-xl text-gray-600 cursor-pointer material-icons"
			on:click="{() => {
				visible = false;
			}}">
			close
		</div>
	</Flex>

	<div class="grid w-full grid-cols-4 gap-3 mt-4">
		{#each categories as category, i}
			{#if category.comps.length > 0}
				<ComponentCategory
					categoryIcon="{category.icon}"
					categoryName="{category.name}"
					categoryDescription="{category.description}"
					components="{category.comps}"
					on:chosen="{componentChosen}" />
			{/if}
		{/each}
		{#if customComponents !== false && !childrenTypes}
			<ComponentCategory
				getIframeUrl="{() => {
					return `/new?blueprint=true`;
				}}"
				mount="{mount}"
				categoryIcon="dashboard_customize"
				categoryName="Custom Components"
				categoryDescription="Komponenten die aus mehreren anderen Komponenten erstellt wurde"
				components="{customComponents}"
				on:chosen="{customComponentChosen}" />
		{/if}
	</div>
</div>
