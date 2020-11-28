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
		filter: grayscale(1);
		mix-blend-mode: multiply;
		height: 60px;
		&:nth-child(1) {
			background-image: resolve('award-courage.jpg');
			background-position: left;
		}
		&:nth-child(2) {
			background-image: resolve('award-delf.jpg');
		}
		&:nth-child(3) {
			background-image: resolve('award-cils.png');
		}
		&:nth-child(4) {
			background-image: resolve('award-cae.png');
			background-position: right;
		}
	}
</style>

<Section customStyles="padding: 0px 15vw 30px;" classes="dashedTopBorder">
	<Flex justify="between" classes="w-full bg-transparent">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</Flex>
</Section>
