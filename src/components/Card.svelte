<script>
	import Flex from './Flex.svelte';
</script>

<Flex
	cols="true"
	justify="center"
	classes="p-2 m-2 bg-white border border-opacity-25 border-gray-400 rounded-lg shadow-lg">
	<slot />
</Flex>
