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
</script>

<Section classes="bg-white lg:h-screen md:h-auto" id="{id}">
	<Flex cols="true" align="center" classes="py-10 h-full">
		<Flex cols="true" align="center">
			<h2 class="text-blue-900">{header}</h2>
			<p class="my-5 text-center text-blue-800">{subHeader}</p>
		</Flex>
		<slot />
		<Link href="{href}">{linkText}</Link>
	</Flex>
</Section>
