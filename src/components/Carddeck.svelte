<script>
	import Flex from './common/Flex.svelte';
	import Section from './Section.svelte';

	export let title;

	/** Additional classes to pass to pass to the section */
	export let background = '';
</script>

<style>
	h4 {
		font-size: 1em;
		text-align: center;
	}
</style>

<Section fullscreen="true" classes="bg-fixed bg-no-repeat {background}" id="carddeck">
	<div>
		<h4 class="mb-2">{title}</h4>
		<Flex wrap="true" justify="center" align="center" classes="px-2 gap-4">
			<slot />
		</Flex>
	</div>
</Section>
