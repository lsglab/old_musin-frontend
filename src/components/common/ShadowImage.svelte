<script>
	import Flex from './Flex.svelte';

	// source of the image
	export let src;
</script>

<Flex justify="center" align="center" classes="w-full h-full overflow-hidden shadow-2xl rounded-lg">
	<img src="{src}" class="object-cover w-full h-full" alt="" />
</Flex>
