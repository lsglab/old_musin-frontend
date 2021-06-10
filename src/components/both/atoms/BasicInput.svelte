<script>
	import Flex from './Flex.svelte';

	/* eslint-disable no-param-reassign */
	export let required = true;
	export let placeholder = '';
	export let name = '';
	export let id;
	export let type;
	// a start value
	export let value;
	export let classes = '';
	export let autocomplete = '';
	export let readonly = false;
	export let options = [];
	export let error = false;

	let visible = false;
	let dropdown;

	function getType() {
		switch (type) {
			case 'radio':
				return 'checkbox';
			default:
				return type;
		}
	}

	const inputType = getType();

	function configAction(node) {
		node.type = inputType;
		node.required = required;
		node.readOnly = readonly;
	}

	function toggleVisible() {
		visible = true;
	}

	function mouseclick(e) {
		if (!(e.path || e.composedPath()).includes(dropdown)) {
			visible = false;
		}
	}

	let selectedName = '';

	function getSelected() {
		const selected = options.find((ele) => ele.value === value);

		if (selected !== undefined) {
			selectedName = selected.name;
		} else {
			selectedName = '';
		}
	}

	$: getSelected(value);
</script>

<style lang="scss">
	.error {
		@apply border-cmsErrorRed;
	}

	.border {
		@apply border-2 focus:border-btnBlue rounded-sm;
	}

	.switch {
		& > .slider::before {
			width: 42%;
			height: 80%;
			transform: translateY(-50%);
			content: '';
			border-radius: 50%;
			top: 50%;
			left: 8%;
			@apply duration-100 bg-white absolute;
		}

		& > input {
			height: 0;
			width: 0;
			opacity: 0;

			&:checked + .slider {
				@apply bg-btnBlue;
			}

			&:focus + .slider {
				box-shadow: 0 0 1px #2196f3;
			}

			&:checked + .slider::before {
				-webkit-transform: translate(100%, -50%);
				-ms-transform: translate(100%, -50%);
				transform: translate(100%, -50%);
			}
		}
	}

	.checkbox {
		input[type='checkbox']:checked + label {
			@apply bg-btnBlue border-none;
		}
	}

	.readonly {
		@apply pointer-events-none;
	}

	input {
		filter: none;
	}

	.visible {
		@apply pointer-events-auto opacity-100;
	}

	.select {
		@apply px-2 py-1 text-xss;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>

<!--
	@component
	Basic input without labels. If you intend to use labels use the Input Component


-->

{#if type === 'radio'}
	<label for="{id}" class="relative inline-block {classes} cursor-pointer switch" class:readonly>
		<input
			use:configAction
			type="checkbox"
			id="{id}"
			on:blur
			on:input
			bind:checked="{value}"
			name="{name}"
			autocomplete = {autocomplete}
			/>
		<span class="absolute inset-0 bg-gray-200 rounded-2xl slider transition-100"></span>
	</label>
{:else if type === 'checkbox'}
	<div class="checkbox {classes} w-3.5 h-3.5" class:readonly class:error>
		<input
			use:configAction
			on:blur
			on:input
			class="hidden"
			type="checkbox"
			id="{id}"
			autocomplete = {autocomplete}
			bind:checked="{value}"
			name="{name}"
			/>

		<label for="{id}" class="relative flex items-center justify-center w-full h-full bg-white border rounded-sm">
			{#if value}
				<span class="text-white text-xss material-icons">done</span>
			{/if}
		</label>
	</div>
{:else if type === 'select' || type === 'enum'}
	<div class="relative">
		<div class:error class:readonly class="cursor-pointer border {visible ? "border-btnBlue": ""}" on:click="{toggleVisible}" >
			<Flex justify="between" align="center" classes="pr-1">
				<p class="bg-white select {classes}">{selectedName}</p>
				<span class="material-icons {visible ? "rotate" : ""}">expand_more</span>
			</Flex>
		</div>
		<div bind:this={dropdown} class="absolute left-0 right-0 z-20 duration-100 border shadow-md opacity-0 pointer-events-none border-btnBlue top-12" class:visible>
			{#each options as option,i}
				<p on:click="{() => {value = option.value;visible = false;}}"
				class="{i !== 0 ? "border-t border-gray-300 border-solid" : ""} w-full cursor-pointer bg-white hover:bg-gray-100 duration-75  select {classes}">
				{option.name}
				</p>
			{/each}
		</div>
	</div>
{:else}
	<input
	on:blur
	on:input
	class:error
	autocomplete="{autocomplete}"
	use:configAction bind:value
	class="p-1 text-xss rounded-sm border {classes}"
	id="{id}"
	placeholder="{placeholder}"
	name="{name}" />
{/if}

<svelte:window on:mousedown="{mouseclick}" />
