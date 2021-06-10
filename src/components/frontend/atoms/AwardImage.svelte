<script>
	import Img from '../../../cms/SiteEditor/Inputs/Img';

	export const blueprint = {
		img: new Img('https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg'),
	};
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
</style>

<div style="background-image: url('{blueprint.img.data}');" id="{blueprint.img.id}"></div>
