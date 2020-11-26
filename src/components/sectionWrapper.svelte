<script>
	import Flex from './common/Flex.svelte';
	import Link from './common/Link.svelte';
	import Section from './Section.svelte';
	// header of this Section
	export let header;
	// subHeader of the title
	export let subHeader = '';
	// Text of the link
	export let linkText;
	// The href of the link
	export let href;
	// The id of the element
	export let id;
	// default padding yes or no
	export let padding = false;
	// additional classes
	export let classes = '';
</script>

<!--
	@component
	Provides a page that usually follows the hero, with a title, subtitle (optional), and link
-->

<Section classes="bg-white lg:min-h-screen md:h-auto {classes}" id="{id}" padding="{padding}">
	<Flex cols="true" align="center" classes="py-10 h-full">
		<Flex cols="true" align="center">
			<h2 class="text-blue-900">{header}</h2>
			<p class="my-5 text-center text-blue-800">{subHeader}</p>
		</Flex>
		<slot />
		{#if href}
			<Link href="{href}">{linkText}</Link>
		{/if}
	</Flex>
</Section>
