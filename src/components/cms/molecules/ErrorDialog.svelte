<script>
	import Button from '../atoms/Button.svelte';
	import Dialog from '../atoms/Dialog.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let res = false;

	export let visible = true;

	function closeDialog() {
		visible = false;
	}
</script>

{#if visible}
	<Dialog classes="w-80" on:close="{closeDialog}">
		<div slot="header">
			<p class="font-bold text-xss">Ein Fehler ist bei dem Senden einer Request aufgetreten {res.status}</p>
		</div>
		<div slot="default">
			<Flex classes="w-full my-3" justify="center" align="center" cols="{true}">
				{#if res.data.message !== undefined}
					<div class="mb-2 text-lg material-icons text-cmsErrorRed">error_outline</div>
					<div class="mb-2 leading-3 text-center text-xss text-cmsErrorRed">{res.data.message}</div>
				{:else}
					<slot name="dialog" />
				{/if}
			</Flex>
		</div>
		<div slot="footer">
			<Flex classes="w-full" justify="between" align="center">
				<Button color="bg-gray-400" buttonFunction="{closeDialog}">OK</Button>
			</Flex>
		</div>
	</Dialog>
{/if}
