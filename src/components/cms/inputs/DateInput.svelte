<script>
	import { formatMMDDYYYY } from '../../../cms/Utils/time';
	import DatePicker from './DatePicker.svelte';

	export let placeholder = '';
	export let name = '';
	export let id;
	// a start value
	export let value;
	export let classes = '';
	export let autocomplete = '';
	export let error = false;
	export let readonly;

	export let configAction;

	let visible = false;
	let datePicked = value ? new Date(value).getTime() : new Date().getTime();

	let datePickerInput;
	let datePicker;

	function mouseclick(e) {
		const datePickerInPath = (e.path || e.composedPath()).includes(datePicker);
		const datePickerInputInPath = (e.path || e.composedPath()).includes(datePickerInput);

		if (!datePickerInPath && !datePickerInputInPath) {
			visible = false;
		}
	}

	function millisToString() {
		value = formatMMDDYYYY(new Date(datePicked));
	}

	function setVisible() {
		if (!readonly) {
			visible = true;
		}
	}

	$: millisToString(datePicked);
</script>

<input
	bind:this="{datePickerInput}"
	on:blur
	on:input
	autocomplete="{autocomplete}"
	use:configAction
	on:focus="{setVisible}"
	bind:value
	type="text"
	class="p-1 relative text-xss rounded-sm input-border {error ? 'input-border-error' : ''} {classes}"
	id="{id}"
	placeholder="{placeholder}"
	name="{name}" />
<div bind:this="{datePicker}">
	<DatePicker id="datepicker-{id}" bind:selected="{datePicked}" bind:visible />
</div>

<svelte:window on:click="{mouseclick}" />
