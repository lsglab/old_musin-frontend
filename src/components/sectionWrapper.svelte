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

<Section classes="bg-white {classes}" id="{id}" padding="{padding}">
	<Flex cols="true" align="center" justify="center" classes="lg:min-h-screen md:h-auto">
		<Flex cols="true" align="center" classes="py-10 w-full">
			<Flex cols="true" align="center">
				<h3 class="z-50 text-heading2">{header}</h3>
				<p class="z-50 mt-4 text-center text-purpleAccent">{subHeader}</p>
			</Flex>
			<slot />
			{#if href}
				<Link href="{href}">{linkText}</Link>
			{/if}
		</Flex>
	</Flex>
</Section>
