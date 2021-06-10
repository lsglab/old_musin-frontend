<script>
	import Card from '../atoms/Card.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	export let href = '';

	export const blueprint = {
		description: new ShortText('Beschreibung'),
		header: new ShortText('Name'),
		img: new Img('http://aeda.gov.gh/wp-content/uploads/2016/11/placeholder-person.jpg'),
	};

	export let classes = '';
</script>

<Card classes="h-80 w-48 m-2 {href ? 'cursor-pointer' : ''} z-10 {classes}" link="{href}">
	<div slot="body" class="w-full overflow-hidden h-8/10">
		<img class="object-cover w-full h-full" id="{blueprint.img.id}" src="{blueprint.img.data}" alt="" />
	</div>
	<div slot="footer" class="h-2/10">
		<Flex align="center" classes="relative h-full bg-white rounded-tr-sm">
			<Flex justify="center" align="center" classes="h-full">
				<div class="mx-2 border-2 border-blue-400 h-7/10"></div>
			</Flex>
			<div>
				<p id="{blueprint.header.id}">{blueprint.header.data}</p>
				<p class="text-xs" id="{blueprint.description.id}">{blueprint.description.data}</p>
			</div>
		</Flex>
	</div>
</Card>

<svelte:options accessors="{true}" />
