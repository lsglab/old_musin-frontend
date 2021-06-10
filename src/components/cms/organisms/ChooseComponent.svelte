<script>
	/* eslint-disable import/first */
	import { compConfig, layout } from '../../../stores';
	import Card from '../../frontend/atoms/Card.svelte';
	import EditComponent from '../../../cms/SiteEditor/EditComponent';
	import Flex from '../../both/atoms/Flex.svelte';

	let visible = false;
	export let parent;

	const components = $compConfig.filter((ele) => {
		return parent.childrenTypes.length === 0 || parent.childrenTypes.includes(ele.name);
	});

	function componentChosen(component) {
		parent.children.push(new EditComponent(component, parent));

		const newList = $layout;

		layout.set(newList);

		visible = false;
	}
</script>

<style lang="scss">
	.visible {
		opacity: 1;
		pointer-events: all;
	}

	.position {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>

<div class:visible class="absolute z-40 opacity-0 pointer-events-none position">
	<Card classes="p-3 auto bg-white">
		<div slot="header">
			<h4 class="text-heading2">Choose a Component</h4>
		</div>
		<div slot="body">
			{#each components as component, i}
				<div
					class="py-1 cursor-pointer hover:bg-gray-100"
					on:click="{() => {
						componentChosen(component);
					}}">
					{component.name}
				</div>
			{/each}
		</div>
	</Card>
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
