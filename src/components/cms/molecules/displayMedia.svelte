<script>
	import Flex from '../../both/atoms/Flex.svelte';

	export let classes = '';
	export let src;
	export let square = false;
	export let justify = 'end';
</script>

<style>
	.aspect-ratio {
		padding-top: 100%;
	}

	.img {
		transform: translateY(-50%);
	}
</style>

<div class="{classes}">
	<div class="relative inline-block w-full align-center">
		<div class="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100">
			<Flex classes="pt-1 float-right px-1 w-full" justify="{justify}">
				<slot />
			</Flex>
		</div>
		{#if square}
			<div class="bg-gray-700 aspect-ratio"></div>
		{/if}
		<img class="{square ? 'absolute bottom-0 left-0 right-0 top-1/2 img' : ''}" src="{src}" alt="" />
		<slot name="overlay" />
	</div>
	<slot name="status" />
</div>
