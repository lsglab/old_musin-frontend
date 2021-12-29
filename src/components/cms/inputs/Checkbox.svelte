<script>
	export let name = '';
	export let id;
	// a start value
	export let value;
	export let classes = '';
	export let autocomplete = '';
	export let readonly = false;
	export let error = false;

	export let typeAction;
	export let configAction;
</script>

<style lang="scss">
	input[type='checkbox']:checked + label {
		@apply bg-cmsBtnColor border-none;
	}
</style>

<input
	use:typeAction
	use:configAction
	on:blur
	on:input
	type="checkbox"
	id="{id}"
	class="hidden"
	autocomplete="{autocomplete}"
	bind:checked="{value}"
	name="{name}" />
<label
	for="{id}"
	class="{classes} flex w-3.5 h-3.5 items-center justify-center bg-white rounded-sm input-border {readonly ? 'input-readonly' : ''} {error ? 'input-error' : ''}">
	{#if value}<span class="text-white text-xss material-icons">done</span>{/if}
</label>
