<script>
	import BasicInput from './BasicInput.svelte';

	export let type;
	export let name = '';
	export let id;
	export let placeholder = '';
	export let required = true;
	export let value;
	// parameter to modify the label position -> left, right,top or bottom
	export let labelPos = 'top';
	// classes to style the label
	export let labelClasses = '';
	// classes to style the input
	export let inputClasses = '';
	// classes to style the container;
	export let classes = '';
	// justify
	export let justify = 'end';
	// autocomplete on or off
	export let autocomplete = '';
	// readonly
	export let readonly = false;
	// options in case type is select or enum
	export let options = [];
	// an error message to display
	export let error = false;

	const props = {
		autocomplete,
		id,
		name,
		options,
		placeholder,
		readonly,
		required,
		type,
	};
</script>

<style>
	.top,
	.bottom {
		@apply self-start;
		font-size: 0.6rem;
	}

	.left,
	.right {
		@apply text-xss font-bold;
	}

	.left {
		@apply mr-2;
	}

	.right {
		@apply ml-2;
	}
</style>

<div
	on:click
	class="flex text-gray-600 {classes} container-{labelPos}  {labelPos === 'left' || labelPos === 'right' ? `flex-row${labelPos === 'right' ? '-reverse' : ''} justify-${justify} items-center` : `flex-col${labelPos === 'bottom' ? '-reverse' : ''}`}">
	<label for="{id}" class="{labelPos} {labelClasses} {readonly ? 'input-readonly' : ''} "><slot /></label>
	<BasicInput
		on:blur
		on:input
		error="{error !== false ? true : error}"
		{...props}
		classes="{inputClasses}"
		bind:value />
	{#if error !== false}
		<p class="font-bold text-cmsErrorRed" style="font-size: 0.57rem;">{error}</p>
	{/if}
</div>
