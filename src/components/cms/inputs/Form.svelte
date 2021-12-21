<script>
	import Button from '../atoms/Button.svelte';
	import Flex from '../atoms/Flex.svelte';
	// id of the form
	export let id;
	// An error message to display in case an error occured
	export let error = '';
	// header
	export let header;
	// subHeader
	export let subHeader = '';
	// what url the request is being sent to
	export let action;
	// method used to send the request, default is post
	export let method = 'post';
	// additional classes for styling
	export let classes = '';
</script>

<form class="p-5 rounded-md shadow-cms-equal {classes}" action="{action}" method="{method}" id="{id}">
	<Flex justify="center" align="center" cols="true" classes="w-full h-full">
		<h5 class="mb-3 text-heading">{header}</h5>
		<p class="mb-3 text-xss text-heading2">{subHeader}</p>
		<p class="mb-5 text-xs text-red-500">{error}</p>
		<slot />
		<Button type="submit" form="{id}" classes="mt-4">Submit</Button>
	</Flex>
</form>
