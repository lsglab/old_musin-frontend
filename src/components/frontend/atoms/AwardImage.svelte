<script>
	import Img from '../../../cms/SiteEditor/Inputs/Img';

	export let blueprint = {
		img: new Img('https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg'),
	};
</script>

<style lang="scss">
	img {
		@apply h-10;
		filter: grayscale(1);
		mix-blend-mode: multiply;
	}
</style>

<img src="{blueprint.img.data}" id="{blueprint.img.id}" alt="" />
