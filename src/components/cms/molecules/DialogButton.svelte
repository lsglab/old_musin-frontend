<script>
	import Button from '../atoms/Button.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';

	export let buttonFunction = () => {};
	export let classes = '';
	export let type = '';
	export let form = '';
	export let color = 'bg-cmsBtnColor';
	export let disabled = false;
	export let dialogText = false;

	let dialogVisible = false;

	function buttonClicked() {
		dialogVisible = true;
	}
</script>

<!--
@component
Button that wants the user to complete a dialog before the function is executed
Does not work with a Button that acts as a Link!
-->

<Button classes={classes} type={type} form={form} color={color} disabled={disabled} buttonFunction={buttonClicked}>
	<slot></slot>
</Button>

<ConfirmDialog bind:visible="{dialogVisible}" dialogFunction="{buttonFunction}" dialogText="{dialogText}">
	<div slot="dialog">
		<slot name="dialog" />
	</div>
</ConfirmDialog>
