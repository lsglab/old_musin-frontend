<script>
	export let placeholder = '';
	export let name = '';
	export let id;
	// a start value
	export let value;
	export let classes = '';
	export let autocomplete = '';
	export let error = false;

	export let configAction;
	export let typeAction;
</script>

<style>
	input {
		filter: none;
	}
</style>

<input
	on:blur
	on:input
	autocomplete="{autocomplete}"
	use:configAction
	use:typeAction
	bind:value
	class="p-1 text-xss rounded-sm input-border {error ? 'input-border-error' : ''} {classes}"
	id="{id}"
	placeholder="{placeholder}"
	name="{name}" />
