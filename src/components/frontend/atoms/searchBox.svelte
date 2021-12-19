<script>
	import Flex from './Flex.svelte';

	export let classes = '';
</script>

<Flex classes="h-9 my-2 px-2 bg-white border border-gray-200 mr-8 border-solid rounded-xl {classes}" align="center">
	<slot />
</Flex>
