<script>
	// image source
	export let image;
	// image description - only visible in enlarged mode
	export let description;
</script>

<!--
	@component
	Provides a click-to-enlarge image within a modal container.
-->
<style lang="scss">
	img:hover {
		cursor: pointer;
		@apply shadow-lg;
	}
</style>

<div class="mx-2 my-1 shadow-md rounded-md"><img src="{image}" alt="{description}" class="h-56 md:h-64 lg:h-80" /></div>
