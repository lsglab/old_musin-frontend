<script>
	import EditInput from '../../EditInput';
	import Flex from '../atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';

	export let id = '';
	export let center = false;

	export const blueprint = {
		header: new EditInput('shortText', 'Titel'),
		subHeader: new EditInput('shortText', 'Zusätzlicher Text'),
	};

	export let classes = '';
</script>

<Section classes="{classes} py-10" id="{id}">
	<Flex cols="true" align="{center ? 'center' : 'start'}">
		<h2 class="mb-4 text-heading {center ? 'text-center' : ''}" id="{blueprint.header.id}">
			{blueprint.header.data}
		</h2>
		<h6 class="font-normal {center ? 'text-center' : ''} md:w-7/12" id="{blueprint.subHeader.id}">
			{blueprint.subHeader.data}
		</h6>
	</Flex>
	<slot />
</Section>
