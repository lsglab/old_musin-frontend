<script>
	import Flex from '../atoms/Flex.svelte';

	export let id;
	// a start value
	export let value;
	export let classes = '';
	export let readonly = false;
	export let options = [];
	export let error = false;

	let dropdown;
	let visible = false;
	let selectedName = '';

	function toggleVisible() {
		visible = true;
	}

	function getSelected() {
		const selected = options.find((ele) => ele.value === value);

		if (selected !== undefined) {
			selectedName = selected.name;
		} else {
			selectedName = '';
		}
	}

	function select(optionValue) {
		value = optionValue;
		visible = false;
	}

	function mouseclick(e) {
		if (!(e.path || e.composedPath()).includes(dropdown)) {
			visible = false;
		}
	}

	$: getSelected(value);
</script>

<style lang="scss">
	.select {
		@apply px-2 py-1 text-xss;
	}

	.visible {
		@apply pointer-events-auto opacity-100;
	}

	.readonly {
		@apply pointer-events-none;
	}
</style>

<div class="relative" id="{id}">
	<div
		class="cursor-pointer {visible ? 'border-btnBlue' : ''} {readonly ? 'input-readonly' : ''} input-border {error ? 'input-border-error' : ''}"
		on:click="{toggleVisible}">
		<Flex justify="between" align="center" classes="pr-1">
			<p class="bg-white select {classes}">{selectedName}</p>
			<span class="material-icons {visible ? 'rotate' : ''}">expand_more</span>
		</Flex>
	</div>
	<div
		bind:this="{dropdown}"
		class="absolute left-0 right-0 z-20 duration-100 shadow-md opacity-0 pointer-events-none input-border border-btnBlue top-12"
		class:visible>
		{#each options as option, i}
			<p
				on:click="{() => {
					select(option.value);
				}}"
				class="{i !== 0 ? 'border-t border-gray-300 border-solid' : ''} w-full cursor-pointer bg-white hover:bg-gray-100 duration-75  select {classes}">
				{option.name}
			</p>
		{/each}
	</div>
</div>

<svelte:window on:mousedown="{mouseclick}" />
