<script>
	// Header of this component
	export let header;
	// The image
	export let image;
	// The link this image links to
	export let href;
</script>

<style lang="scss">
	.img {
		padding-top: 56.25%; /* 16:9 Aspect Ratio */
		transition: 0.2 ease;
	}

	.img:hover {
		cursor: pointer;
		@apply shadow-2xl;
	}
</style>

<div class="w-full my-10 lg:w-9/20">
	<p class="text-center text-blue-700">{header}</p>
	<div class="w-full py-10">
		<a href="{href}" class="w-full h-full">
			<div
				class="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg shadow-lg img"
				style="background-image: url({image})"></div>
		</a>
	</div>
</div>
