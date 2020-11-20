<script>
	import Flex from '../components/common/Flex.svelte';
	import ShadowImage from '../components/common/ShadowImage.svelte';

	export let title;
	export let src = '../assets/media/lsg.png';
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
	<h4 align="center" class="mb-2">{title} | {process.globals.title}</h4>
	<Flex wrap="true" justify="center" align="center" classes="px-2 gap-4">
		<ShadowImage classes="bg-gray-300 shadow-lg rounded-md p-2" background="false" scr="../assets/media/lsg.png" />
	</Flex>
</div>
