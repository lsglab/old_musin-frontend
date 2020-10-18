<script>
	import Flex from './common/Flex.svelte';
	import Scroll from './Scroll.svelte';
	import Section from './Section.svelte';
	import _ from 'lodash';

	export let title = process.globals.title;
	export let subtitle = process.globals.start;
	export let id = _.camelCase(title);
	export let to;
</script>

<style lang="scss">
	#headerImg {
		background: transparent resolve('bg.jpg') center center/cover no-repeat border-box border-box fixed;
		&::after {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			content: '';
			background: transparent resolve('black.jpg') center center/cover no-repeat border-box border-box scroll;
			opacity: 0.5;
		}
	}
</style>

<Section fullscreen="true" classes="px-4 text-center md:px-8 xl:px-16 bg-transparent" id="{id}">
	<div class="relative w-full h-full" id="headerImg">
		<Flex both="center" classes="w-full h-full">
			<div class="relative z-10 text-white">
				<h1>{title}</h1>
				<p class="fluid-xs">{subtitle}</p>
				<Scroll target="{to}" />
			</div>
		</Flex>
	</div>
</Section>
