<script>
	export let title = process.globals.title;
	export let subtitle = process.globals.start;
</script>

<style lang="scss">
	#headerImg {
		background: url('bg.jpg') center center/auto 100% no-repeat border-box border-box fixed;
		@media (min-width: 768px) {
			background-size: 100% auto;
		}
		&::after {
			position: absolute;
			width: 100%;
			height: 100%;
			content: '';
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
</style>

<section class="w-full h-full p-4 text-center bg-gray-300 md:p-8 xl:p-16">
	<div class="relative w-full h-full center" id="headerImg">
		<div class="relative z-10 text-white">
			<h1>{title}</h1>
			<p class="fluid-xs">{subtitle}</p>
		</div>
	</div>
</section>
