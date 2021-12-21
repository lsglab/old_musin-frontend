<script>
	import Checkbox from './Checkbox.svelte';
	import DateInput from './DateInput.svelte';
	import DefaultInput from './DefaultInput.svelte';
	import Enumeration from './Enumeration.svelte';
	import RadioButton from './RadioButton.svelte';
	import TimeInput from './TimeInput.svelte';

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

	function getType() {
		switch (type) {
			case 'radio':
				return 'checkbox';
			default:
				return type;
		}
	}

	const inputType = getType();

	function typeAction(node) {
		node.type = inputType;
	}

	function configAction(node) {
		node.required = required;
		node.readOnly = readonly;
	}
</script>

<!--
	@component
	Basic inputs without labels. If you intend to use labels use the Input Component


-->

{#if type === 'radio'}
	<RadioButton
		on:blur
		on:input
		bind:value={value}
		id={id}
		name={name}
		classes={classes}
		autocomplete={autocomplete}
		readonly={readonly}
		typeAction={typeAction}
		configAction={configAction}>
	</RadioButton>
{:else if type === 'checkbox'}
	<Checkbox
		on:blur
		on:input
		name={name}
		id={id}
		bind:value={value}
		classes={classes}
		autocomplete={autocomplete}
		readonly={readonly}
		error={error}
		typeAction={typeAction}
		configAction={configAction}>
	</Checkbox>
{:else if type === 'select' || type === 'enum'}
	<Enumeration
		bind:value={value}
		classes={classes}
		readonly={readonly}
		options={options}
		error={error}
		id={id}>
	</Enumeration>
{:else if type === 'date'}
	<DateInput
		placeholder={placeholder}
		name={name}
		id={id}
		bind:value={value}
		classes={classes}
		autocomplete={autocomplete}
		error={error}
		configAction={configAction}
		readonly={readonly}
		on:blur
		on:input
	></DateInput>
{:else if type === 'time'}
	<TimeInput
		readonly={readonly}
		placeholder={placeholder}
		name={name}
		id={id}
		bind:value={value}
		classes={classes}
		error={error}
		configAction={configAction}
	>
	</TimeInput>
{:else}
	<DefaultInput
		error={error}
		autocomplete={autocomplete}
		configAction={configAction}
		typeAction={typeAction}
		bind:value={value}
		placeholder={placeholder}
		id={id}
		name={name}
		classes={classes}
		on:blur
		on:input>
	</DefaultInput>
{/if}
