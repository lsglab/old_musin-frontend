<script>
	import Flex from './common/Flex.svelte';
	import Section from './Section.svelte';

	export let title;
	export let cards = [];
</script>

<style>
	h4 {
		font-size: 1em;
		text-align: center;
	}
</style>

<Section fullscreen="true" classes="bg-rect-pattern bg-fixed bg-no-repeat" id="carddeck">
	<div>
		<h4 class="mb-2">{title}</h4>
		<Flex wrap="true" justify="center" align="center" classes="px-2 gap-4">
			{#each cards as card}
				<svelte:component this="{card.component}" title="{card.title}" links="{card.links}" />
			{/each}
		</Flex>
	</div>
</Section>
