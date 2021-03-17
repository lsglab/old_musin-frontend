<script>
	import Flex from '../../components/atoms/Flex.svelte';
	import Section from '../../components/atoms/Section.svelte';
	import SectionWrapper from '../../components/molecules/sectionWrapper.svelte';

	export let title;
</script>

<style lang="scss">
	h4 {
		@apply text-center text-lg;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div style="margin-top: -80px;" class="bg-backgroundDark">
	<Section classes="py-10 pt-20">
		<h3 class="text-heading">Informationen für Eltern</h3>
		<Flex />
	</Section>
</div>
<SectionWrapper />
