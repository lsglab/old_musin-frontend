<script>
	import Flex from './common/Flex.svelte';
	import Scroll from './Scroll.svelte';
	import Section from './Section.svelte';
	import _ from 'lodash';

	export let classes = '';
	export let title = process.globals.title;
	export let subtitle = process.globals.start;
	export let id = _.camelCase(title);
	export let to;
</script>

<style lang="scss">
	#headerImg {
		background: resolve('bg.jpg') center center/cover no-repeat border-box border-box fixed;
		&::after {
			position: absolute;
			width: 100%;
			height: 100%;
			content: '';
			background: resolve('black.jpg') center center/cover no-repeat border-box border-box scroll;
			opacity: 0.5;
		}
	}
</style>

<Section fullscreen="true" classes="p-4 text-center md:p-8 xl:p-16 {classes}" id="{id}">
	<div class="relative fullscreen" id="headerImg">
		<Flex justify="center" align="center">
			<div class="relative z-10 text-white">
				<h1>{title}</h1>
				<p class="fluid-xs">{subtitle}</p>
				<Scroll target="{to}" />
			</div>
		</Flex>
	</div>
</Section>
