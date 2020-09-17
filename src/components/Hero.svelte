<script>
	import Grid from './Grid.svelte';

	export let title = process.globals.title;
	export let subtitle = process.globals.start;
</script>

<style lang="scss">
	#headerImg {
		background: url('bg.jpg') center center/auto 100% no-repeat border-box border-box fixed;
		@media (min-width: 768px) {
			background-size: 100% auto;
		}
	}
</style>

<Grid cols="2" classes="w-full h-full bg-gray-300 text-center">
	<div class="center">
		<div class="relative z-10 text-gray-900">
			<h1>{title}</h1>
			<p class="fluid-xs">{subtitle}</p>
		</div>
	</div>
	<div class="p-4 text-center md:p-8 xl:p-16">
		<div class="w-full h-full rounded-sm" id="headerImg"></div>
	</div>
</Grid>
