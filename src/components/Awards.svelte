<script>
	import Flex from './common/Flex.svelte';
	import Section from './Section.svelte';
</script>

<style lang="scss">
	div {
		@apply w-full h-full;
		background-position: center center;
		background-size: contain;
		background-repeat: no-repeat;
		&:nth-child(1) {
			background-image: resolve('award-cae.png');
		}
		&:nth-child(2) {
			background-image: resolve('award-cils.png');
		}
		&:nth-child(3) {
			background-image: resolve('award-courage.jpg');
		}
		&:nth-child(4) {
			background-image: resolve('award-delf.jpg');
		}
	}
</style>

<Section classes="p-4">
	<Flex justify="around" classes="w-full bg-transparent h-16">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</Flex>
</Section>
