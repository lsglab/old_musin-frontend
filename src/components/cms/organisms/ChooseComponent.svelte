<script>
	/* eslint-disable import/first */
	import { alignment, cards, images, sections, special, templates, text } from '../../../cms/SiteEditor/Components';
	import { compConfig } from '../../../stores';
	import { createEventDispatcher } from 'svelte';
	import ComponentCategory from '../molecules/ComponentCategory.svelte';
	import EditComponent from '../../../cms/SiteEditor/EditComponent';
	import Flex from '../../both/atoms/Flex.svelte';

	let visible = false;
	export let parent = null;

	export let customComponents = false;

	const childrenTypes = parent.childrenTypes.length > 0;

	const dispatch = createEventDispatcher();

	const components = $compConfig.filter((ele) => {
		return parent.childrenTypes.length === 0 || parent.childrenTypes.includes(ele.name);
	});

	const categories = [alignment, cards, sections, templates, images, text, special];

	if (parent.childrenTypes.length > 0) {
		categories.forEach((category) => {
			// eslint-disable-next-line no-param-reassign
			category.comps = category.comps.filter((comp) => parent.childrenTypes.includes(comp.component));
		});
	}

	function componentChosen(e) {
		const component = components.find((ele) => ele.name === e.detail.component.component);
		dispatch('chosen', new EditComponent(component, parent));
		visible = false;
	}

	function customComponentChosen(e) {
		const blueprint = JSON.parse(JSON.parse(e.detail.component.blueprint));
		const component = new EditComponent();
		component.setCustomComponent(e.detail.component);
		component.createFromData(blueprint, $compConfig, customComponents, parent);
		dispatch('chosen', component);
		visible = false;
	}

	function mount(comps) {
		comps.forEach((component) => {
			window.document.addEventListener(
				'blueprint_iframe_mounted',
				() => {
					const blueprint = JSON.parse(JSON.parse(component.blueprint));

					const event = new CustomEvent('create_blueprint', { detail: { blueprint, customComponents } });
					document.getElementById(component.name).contentDocument.dispatchEvent(event);
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
				getIframeUrl="{(component) => {
					return `/new?blueprint=${component.blueprint}`;
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
<div
	on:click="{() => {
		visible = true;
	}}"
	class="w-full h-full">
	<Flex
		justify="center"
		align="center"
		classes="w-full h-full text-center text-white rounded-full cursor-pointer bg-cmsBtnColor">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 0 24 24"
			width="24px"
			class="fill-current"
			fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
	</Flex>
</div>
