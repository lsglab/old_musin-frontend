<script>
	/* eslint-disable no-param-reassign */
	import TimePicker from './TimePicker.svelte';

	export let placeholder = '';
	export let name = '';
	export let id;
	export let readonly;
	// a start value
	export let value;
	export let classes = '';
	export let error = false;

	export let configAction;

	let visible = false;

	let timePickerInput;
	let timePicker;

	function mouseclick(e) {
		const timePickerInPath = (e.path || e.composedPath()).includes(timePicker);
		const timePickerInputInPath = (e.path || e.composedPath()).includes(timePickerInput);

		if (!timePickerInPath && !timePickerInputInPath) {
			visible = false;
		}
	}

	function setVisible() {
		if (!readonly) {
			visible = true;
		}
	}

	function ownConfigAction(node) {
		node.readOnly = true;
	}
</script>

<input
	bind:this="{timePickerInput}"
	on:blur
	on:input
	bind:value
	use:configAction
	use:ownConfigAction
	on:focus="{setVisible}"
	type="text"
	class="p-1 relative text-xss rounded-sm input-border {error ? 'input-border-error' : ''} {classes}"
	id="{id}"
	placeholder="{placeholder}"
	name="{name}"
	readonly />
<div bind:this="{timePicker}">
	<TimePicker id="timepicker-{id}" bind:value bind:visible />
</div>

<svelte:window on:click="{mouseclick}" />
