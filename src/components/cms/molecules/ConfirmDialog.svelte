<script>
	import Button from '../atoms/Button.svelte';
	import Dialog from '../atoms/Dialog.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let dialogFunction = () => {};

	export let dialogText = '';

	export let visible = false;

	function closeDialog() {
		visible = false;
	}

	function confirm() {
		dialogFunction();
		closeDialog();
	}
</script>

{#if visible}
	<Dialog classes="w-80" on:close="{closeDialog}">
		<div slot="header">
			<p class="font-bold text-xss">Bitte Bestätigen</p>
		</div>
		<div slot="default">
			<Flex classes="w-full my-3" justify="center" align="center" cols="{true}">
				{#if dialogText !== false}
					<div class="mb-2 text-lg material-icons text-cmsErrorRed">error_outline</div>
					<div class="mb-2 leading-3 text-center text-xss text-cmsErrorRed">{dialogText}</div>
				{:else}
					<slot name="dialog" />
				{/if}
			</Flex>
		</div>
		<div slot="footer">
			<Flex classes="w-full" justify="between" align="center">
				<Button color="bg-gray-400" buttonFunction="{closeDialog}">Abbrechen</Button>
				<Button color="bg-cmsErrorRed" buttonFunction="{confirm}" classes="text-white">Ja, Bestätigen</Button>
			</Flex>
		</div>
	</Dialog>
{/if}
