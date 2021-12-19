<script>
	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	import Flex from './Flex.svelte';

	export let blueprint = {
		content: new ShortText('Kurze Beschreibung'),
		header: new ShortText('Name der Aufgabe'),
		img: new Img(),
	};

	export let classes = '';
</script>

<Flex classes="{classes} p-4">
	<div
		id="{blueprint.img.id}"
		class="h-10 p-5 mt-1 mr-2 bg-green-300 bg-center bg-no-repeat rounded-full"
		style="background-image: url('{blueprint.img.data}');"></div>
	<div>
		<p class="font-bold text-gray-500" id="{blueprint.header.id}">{blueprint.header.data}</p>
		<p class="text-xs font-bold text-gray-400" id="{blueprint.content.id}">{blueprint.content.data}</p>
	</div>
</Flex>
