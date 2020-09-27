<script>
	import Flex from './Flex.svelte';
	// source of the image
	export let src;
	// should the image be an background image or not
	export let background = false;
</script>

<style lang="scss">
	.backgroundImage {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>

<Flex justify="center" align="center" classes="w-full h-full overflow-hidden shadow-2xl rounded-lg">
	{#if background}
		<div class="w-full h-full backgroundImage" alt="" style="background-image: url({src})"></div>
	{:else}<img class="object-cover w-full h-full" src="{src}" alt="" />{/if}
</Flex>
