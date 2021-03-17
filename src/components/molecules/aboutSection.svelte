<script>
	import Flex from '../atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';

	export let header;
	export let subHeader = '';
	export let classes = '';
	export let center = false;
	export let id = '';
</script>

<Section classes="{classes} py-10" id="{id}">
	<Flex cols="true" align="{center ? 'center' : 'start'}">
		<h2 class="mb-4 text-heading {center ? 'text-center' : ''}">{header}</h2>
		<h6 class="font-normal {center ? 'text-center' : ''} md:w-7/12">{subHeader}</h6>
	</Flex>
	<slot />
</Section>
