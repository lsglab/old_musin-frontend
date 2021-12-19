<script>
	import Flex from '../atoms/Flex.svelte';

	export let id = 'timePicker';
	export let visible = false;
	export let classes;

	export let value = '00:00:00';

	let hoursString;
	let minutesString;

	let hoursError = false;
	let minutesError = false;

	function parseValue() {
		if (value === undefined || value === null) {
			value = '00:00:00';
		}

		const split = value.split(':');

		hoursString = split[0];
		minutesString = split[1];
	}

	function validate(string, regex) {
		if (!string.match(regex)) {
			return false;
		}

		return true;
	}

	function validateHours() {
		const regex = /^[0-2][0-9]$/g;
		const result = validate(hoursString, regex);

		if (result === false) {
			hoursError = true;
			return;
		}

		hoursError = false;
	}

	function validateMinutes() {
		const regex = /^[0-5][0-9]$/g;
		const result = validate(minutesString, regex);

		if (result === false) {
			minutesError = true;
			return;
		}

		minutesError = false;
	}

	function select() {
		if (hoursError || minutesError) {
			visible = false;
			return;
		}
		value = `${hoursString}:${minutesString}:00`;
		visible = false;
	}

	parseValue();
</script>

<style>
	.visible {
		@apply pointer-events-auto opacity-100;
	}

	.tooltip {
		@apply text-gray-500;
		font-size: 0.6rem;
		line-height: 0.6rem;
	}

	.input-tooltip {
		@apply m-1 float-left;
	}

	.input-text {
		@apply text-center font-bold;
		font-size: 1.6rem;
	}

	.input-width {
		@apply w-20;
	}

	.input-height {
		@apply h-12;
	}

	.time-input {
		@apply p-1 mb-1 focus:bg-white bg-gray-100 w-full h-full;
	}

	.text-button {
		@apply uppercase duration-75 text-cmsBtnColor px-1 py-0.5 cursor-pointer rounded-sm hover:bg-gray-100 font-bold text-xss;
	}
</style>

<!--
	@component
	Timepicker that follows the material design guidelines https://material.io/components/time-pickers

-->

<div
	class="absolute {classes} z-40 px-4 pt-2 pb-1 bg-white rounded-md opacity-0 pointer-events-none box shadow-cms-equal-xl"
	id="{id}"
	class:visible>
	<p class="mt-1 mb-4 font-bold uppercase tooltip">Zeit eingeben</p>
	<Flex>
		<div class="input-width input-height">
			<input bind:value="{hoursString}" on:blur="{validateHours}" type="text" class="time-input input-text input-border {hoursError ? "input-border-error" : ""}"/>
		</div>
		<Flex classes="input-height w-4" justify="center" align="center">
			<p class="input-text">:</p>
		</Flex>
		<div class="input-height input-width">
			<input bind:value={minutesString} on:blur="{validateMinutes}" type="text" class="time-input input-text input-border {minutesError ? "input-border-error" : ""}"/>
		</div>
	</Flex>
	<Flex justify="between" classes="mb-2">
		<div class="input-width">
			<p class='tooltip input-tooltip'>Stunde</p>
		</div>
		<div class="input-width">
			<p class='tooltip input-tooltip'>Minute</p>
		</div>
	</Flex>
	<Flex classes="w-full" justify="end">
		<p on:click="{() => {visible = false;}}" class='text-button'>Abbrechen</p>
		<p on:click="{select}" class="text-button">Ok</p>
	</Flex>
</div>
