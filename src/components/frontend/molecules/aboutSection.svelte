<script>
	import Flex from '../../both/atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	export let id = '';
	export let center = false;

	export let blueprint = {
		header: new ShortText('Titel'),
		subHeader: new ShortText('Zusätzlicher Text'),
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
	<Flex cols="true" align="{center ? 'center' : 'start'}" classes="w-full">
		<slot />
	</Flex>
</Section>
