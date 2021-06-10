<script>
	import Flex from '../../both/atoms/Flex.svelte';

	export let classes = '';
	export let src;
</script>

<style>
	.aspect-ratio {
		padding-top: 100%;
	}
</style>

<div class="relative {classes} inline-block align-center">
	<div class="absolute top-0 right-0 z-50 w-full h-full opacity-0 hover:opacity-100">
		<Flex classes="mt-1 float-right mr-1">
			<slot />
		</Flex>
	</div>
	<div class="bg-gray-700 aspect-ratio "></div>
	<img class="absolute bottom-0 left-0 right-0 top-1/2 img" style="transform: translateY(-50%);" src="{src}" alt="" />
</div>
