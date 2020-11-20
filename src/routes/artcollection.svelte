<script>
	import Flex from '../components/common/Flex.svelte';

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
<div id="artcollection">
	<Flex />
</div>
