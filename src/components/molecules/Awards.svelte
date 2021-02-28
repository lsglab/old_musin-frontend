<script>
	import Flex from '../atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';

	export let awards = [];
</script>

<style lang="scss">
	div {
		@apply w-full mx-auto h-10;
		background-position: center center;
		background-size: contain;
		background-repeat: no-repeat;
		filter: grayscale(1);
		mix-blend-mode: multiply;
	}

	.awards {
		&:first-child {
			background-position: left;
		}

		&:last-child {
			background-position: right;
		}
	}
</style>

<Section customStyles="padding-bottom: 30px;" classes="dashedTopBorder hidden md:block">
	<Flex justify="between" classes="w-full bg-transparent">
		{#each awards as award}
			<div style="background-image: url('{award}');" class="{awards.length > 1 ? 'awards' : ''}"></div>
		{/each}
	</Flex>
</Section>
