<script>
	import Flex from '../../both/atoms/Flex.svelte';

	export let classes = '';
	// location
	export let src;
	// media type
	export let type;
	// displayed as square?
	export let square = false;
	export let justify = 'end';

	// function returns the url with the right image for the media,
	// for images src is returned for pdfs an extra image is used
	function getImageUrl() {
		if (type === 'application/pdf') {
			return '/pdf.svg';
		}

		return src;
	}
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
		<div class="absolute top-0 left-0 z-10 w-full h-full opacity-0 hover:opacity-100">
			<Flex classes="pt-1 float-right px-1 w-full" justify="{justify}">
				<slot />
			</Flex>
		</div>
		{#if square}
			<div class="bg-gray-700 aspect-ratio"></div>
		{/if}
		<img class="{square ? 'absolute bottom-0 left-0 right-0 top-1/2 img' : ''}" src="{getImageUrl()}" alt="" />
		<slot name="overlay" />
	</div>
	<slot name="status" />
</div>
