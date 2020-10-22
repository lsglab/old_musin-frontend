<script>
	import Card from './common/Card.svelte';
	import Flex from './common/Flex.svelte';

	export let title;
	export let links = [];
</script>

<!--
    @component
    Template card component for an infopage.
-->
<style>
	h4 {
		font-size: 1em;
		text-align: center;
	}
</style>

<Card>
	<div slot="header">
		<h4>{title}</h4>
	</div>
	<div slot="body" class="rounded-md bg-gray-400">
		<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full">
			{#each links as link}
				<svelte:component this="{link.component}" content="{link.text}" href="{link.href}" />
			{/each}
		</Flex>
	</div>
	<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
</Card>
