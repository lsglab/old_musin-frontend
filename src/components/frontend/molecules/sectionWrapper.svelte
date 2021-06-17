<script>
	import Flex from '../../both/atoms/Flex.svelte';
	import InputLink from '../../../cms/SiteEditor/Inputs/Link';
	import Link from '../../both/atoms/Link.svelte';
	import Section from '../atoms/Section.svelte';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';
	// header of this Section
	// export let header = '<input class="cms-input" type="text" placeholder="Enter a header"></input>';
	// subHeader of the title
	// export let subHeader = '';
	// Text of the link
	// export let linkText;
	// The href of the link
	// export let link;
	// The id of the element
	export let id = '';
	// section height 100vh ?
	export let fullscreen = false;
	// describes the "object"
	export let blueprint = {
		header: new ShortText('Titel der Section'),
		link: new InputLink('Ein Link (optional)'),
		subHeader: new ShortText('subHeader der Section'),
	};
	// the address the link is supposed to go to
	export let href = '';
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
	<Flex cols="true" align="center" justify="center" classes="lg:{fullscreen ? "min-h-screen" : "h-auto" } md:h-auto">
		<Flex cols="true" align="center" classes="py-10 w-full">
			<Flex cols="true" align="center">
				<h3 class="text-center text-heading2" id="{blueprint.header.id}">{blueprint.header.data}</h3>
				<p class="mt-4 text-center text-purpleAccent" id="{blueprint.subHeader.id}">{blueprint.subHeader.data}</p>
			</Flex>
			<div>
				<slot />
			</div>
			{#if href !== undefined}
				<Link href="{blueprint.link.href}" id="{blueprint.link.id}">{blueprint.link.data}</Link>
			{/if}
		</Flex>
	</Flex>
</Section>
