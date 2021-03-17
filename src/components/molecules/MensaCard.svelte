<script>
	import Card from '../atoms/Card.svelte';

	// Header of this componen
	export let header;
	// The image
	export let img;
	// The link this image links to
	export let href;
</script>

<Card link="{href}" classes="lg:w-1/3 md:w-1/2 w-full m-5 lg:m-10 h-60">
	<div slot="header" class="flex items-center ml-4 h-1/5">{header}</div>
	<div slot="body" class="bg-center bg-no-repeat bg-cover h-4/5" style="background-image: url({img})"></div>
</Card>
