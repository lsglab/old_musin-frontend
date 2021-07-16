<script>
	/* eslint-disable import/first */
	import { alignment, cards, images, sections, templates, text } from '../../../cms/SiteEditor/Components';
	import { compConfig } from '../../../stores';
	import { createEventDispatcher } from 'svelte';
	import EditComponent from '../../../cms/SiteEditor/EditComponent';
	import Flex from '../../both/atoms/Flex.svelte';

	let visible = false;
	export let parent;

	const dispatch = createEventDispatcher();

	const components = $compConfig.filter((ele) => {
		return parent.childrenTypes.length === 0 || parent.childrenTypes.includes(ele.name);
	});

	const categories = [alignment, cards, sections, templates, images, text];

	if (parent.childrenTypes.length > 0) {
		categories.forEach((category) => {
			// eslint-disable-next-line no-param-reassign
			category.comps = category.comps.filter((comp) => parent.childrenTypes.includes(comp.component));
		});
	}

	function componentChosen(component) {
		dispatch('chosen', new EditComponent(component, parent));
		visible = false;
	}

	function getComponent(name) {
		return components.find((ele) => ele.name === name);
	}
</script>

<style lang="scss">
	.visible {
		opacity: 1;
		pointer-events: auto;
		cursor: auto;
	}

	.category-header:hover + .category-desc {
		opacity: 1;
		pointer-events: auto;
	}

	.component:hover > .component-desc {
		opacity: 1;
		pointer-events: auto;
	}

	.iframe-container {
		padding-top: 56.25%;
	}

	.component-desc {
		@apply left-1/2 pt-5;
		transform: translateX(-50%);
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

	<Flex classes="w-full mt-4" justify="between">
		{#each categories as category, i}
			{#if category.comps.length > 0}
				<div class="w-1/4">
					<div class="relative">
						<div class="category-header">
							<Flex align="center">
								<p class="mr-2 font-light material-icons">{category.icon}</p>
								<p class="font-bold">{category.name}</p>
							</Flex>
						</div>
						<div
							class="absolute z-10 w-32 h-auto p-2 font-light leading-5 bg-white rounded-sm shadow-lg opacity-0 pointer-events-none text-xss category-desc">
							{category.desc}
						</div>
					</div>
					<div>
						{#each category.comps as component}
							<Flex>
								<div class="text-xss material-icons">navigate_next</div>
								<div
									class="relative p-1 text-xs duration-75 rounded-sm cursor-pointer component hover:bg-gray-100"
									on:click="{() => {
										componentChosen(getComponent(component.component));
									}}">
									{component.name}
									<div class="absolute z-10 opacity-0 pointer-events-none component-desc">
										<div class="bg-white rounded-sm shadow-xl card-position w-96">
											<div class="relative overflow-hidden iframe-container">
												<iframe
													on:click="{() => {
														componentChosen(getComponent(component.component));
													}}"
													id="{component.component}"
													title="{component.name}"
													src="/new?component={component.component}"
													class="absolute top-0 left-0 w-full h-full"></iframe>
											</div>
											<div class="p-2 mt-2 font-light leading-5 bg-gray-100 rounded-sm text-xss">
												{component.desc}
											</div>
										</div>
									</div>
								</div>
							</Flex>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</Flex>
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
