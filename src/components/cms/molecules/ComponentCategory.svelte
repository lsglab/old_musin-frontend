<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Flex from '../atoms/Flex.svelte';

	const dispatch = createEventDispatcher();

	export let categoryIcon;
	export let categoryName;
	export let categoryDescription;

	export let components;

	export let classes = '';

	/* export let getIframeUrl = (component) => {
		return `/new?component=${component.component}`;
	}; */

	export let mount = () => {};

	function chosen(component) {
		dispatch('chosen', { component });
	}

	onMount(() => {
		mount(components);
	});
</script>

<style lang="scss">
	.category-header:hover + .category-desc {
		opacity: 1;
		pointer-events: auto;
	}

	/*
	.component:hover > .component-desc {
		opacity: 1;
		pointer-events: auto;
	} */

	.iframe-container {
		padding-top: 56.25%;
	}

	.component-desc {
		@apply left-1/2 pt-5;
		transform: translateX(-50%);
	}
</style>

<div class="{classes}">
	<div class="relative">
		<div class="category-header">
			<Flex align="center">
				<p class="mr-2 font-light material-icons">{categoryIcon}</p>
				<p class="font-bold">{categoryName}</p>
			</Flex>
		</div>
		<div
			class="absolute z-10 w-32 h-auto p-2 font-light leading-5 bg-white rounded-sm shadow-lg opacity-0 pointer-events-none text-xss category-desc">
			{categoryDescription}
		</div>
	</div>
	<div>
		{#each components as component}
			<Flex>
				<div class="text-xss material-icons">navigate_next</div>
				<div
					class="relative p-1 text-xs duration-75 rounded-sm cursor-pointer component hover:bg-gray-100"
					on:click="{() => {
						chosen(component);
					}}">
					{component.name}
					<!--
					<div class="absolute z-10 opacity-0 pointer-events-none component-desc">
						<div class="bg-white rounded-sm shadow-xl card-position w-96">
							<div
								class="relative overflow-hidden iframe-container"
								on:click="{() => {
									chosen(component);
								}}">
								<slot />

								<iframe
									id="{component.name}"
									title="{component.name}"
									src="{getIframeUrl(component)}"
									class="absolute top-0 left-0 w-full h-full"></iframe>
							</div>
							<div class="p-2 mt-2 font-light leading-5 bg-gray-100 rounded-sm text-xss">
								{component.description}
							</div>
						</div>
					</div>
					-->
				</div>
			</Flex>
		{/each}
	</div>
</div>
