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
	.checkbox {
		input[type='checkbox']:checked + label {
			@apply bg-btnBlue border-none;
		}
	}
</style>

<div class="checkbox {classes} w-3.5 h-3.5 {readonly ? 'input-readonly' : ''} {error ? 'input-error' : ''}">
	<input
		use:typeAction
		use:configAction
		on:blur
		on:input
		class="hidden"
		type="checkbox"
		id="{id}"
		autocomplete="{autocomplete}"
		bind:checked="{value}"
		name="{name}" />

	<label for="{id}" class="relative flex items-center justify-center w-full h-full bg-white rounded-sm input-border">
		{#if value}<span class="text-white text-xss material-icons">done</span>{/if}
	</label>
</div>
