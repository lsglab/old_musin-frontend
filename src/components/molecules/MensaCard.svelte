<script>
	import EditInput from '../../EditInput';

	import Card from '../atoms/Card.svelte';

	// The link this image links to
	export let href = '';

	export const blueprint = {
		header: new EditInput('shortText', 'Titel'),
		img: new EditInput('img', 'https://i.stack.imgur.com/y9DpT.jpg'),
	};
</script>

<Card link="{href}" classes="lg:w-1/3 md:w-1/2 w-full m-5 lg:m-10 h-60">
	<div slot="header" class="flex items-center ml-4 h-1/5" id="{blueprint.header.id}">{blueprint.header.data}</div>
	<div
		slot="body"
		class="bg-center bg-no-repeat bg-cover h-4/5"
		id="{blueprint.img.id}"
		style="background-image: url({blueprint.img.data})"></div>
</Card>
