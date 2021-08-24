<script>
	import Flex from '../../both/atoms/Flex.svelte';
	import InputLink from '../../../cms/SiteEditor/Inputs/Link';
	import Link from '../../both/atoms/Link.svelte';
	import Section from '../atoms/Section.svelte';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	// The id of the element
	export let id = '';
	// section height 100vh ?
	export let fullscreen = false;
	// whether section wrapper has link or not
	export let link = true;

	export let blueprint = {
		header: new ShortText('Titel der Section'),
		link: new InputLink('Ein Link (optional)'),
		subHeader: new ShortText('subHeader der Section'),
	};
	// default padding yes or no
	export let padding = false;
	// additional classes
	export let classes = '';
</script>

<!--
	@component
	Provides a page that usually follows the hero, with a title, subtitle (optional), and link
-->

<Section classes="bg-white {classes}" id="{id}" padding="{padding}">
	<Flex cols="true" align="center" justify="between" classes="py-10 w-full lg:{fullscreen ? "min-h-screen" : "h-auto" } md:h-auto">
		<Flex cols="true" align="center">
			<h3 class="text-center text-heading2" id="{blueprint.header.id}">{blueprint.header.data}</h3>
			<p class="mt-4 text-center text-purpleAccent" id="{blueprint.subHeader.id}">{blueprint.subHeader.data}</p>
		</Flex>
		<div>
			<slot />
		</div>
		<Link href="{blueprint.link.href}" classes="{link ? '' : 'hidden'}" id="{blueprint.link.id}">{blueprint.link.data}</Link>
	</Flex>
</Section>
