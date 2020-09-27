<script>
	import ShadowImage from './common/ShadowImage.svelte';

	// Header of this componen
	export let header;
	// The image
	export let image;
</script>

<style lang="scss">
	.img-wrapper {
		height: 400px;
	}

	.hover:hover {
		cursor: pointer;
		height: 104%;
		transition: 0.2 ease;
	}
</style>

<div class="md:w-full lg:w-1/2">
	<p class="text-center text-blue-700">{header}</p>
	<div class="p-10">
		<div class="img-wrapper">
			<div class="w-full h-full hover">
				<ShadowImage src="{image}" />
			</div>
		</div>
	</div>
</div>
