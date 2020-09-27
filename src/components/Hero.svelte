<script>
	import Button from './common/Button.svelte';
	import Flex from './common/Flex.svelte';
	import ShadowImage from './common/ShadowImage.svelte';
	import DashBackground from './DashBackground.svelte';
	// The header of the Hero
	export let header;
	// The sub-header
	export let subHeader = '';
	// A short note
	export let note = '';
	// Button Text
	export let buttonText;
	// the link the button goes to
	export let href;
	// The main image
	export let image;
	// A list with all the award images
	export let awards = [];
</script>

<style lang="scss">
	.header {
		height: 80%;
		padding-top: 5%;

		* {
			z-index: 2;
		}
	}

	.hero {
		padding: 0 10%;
	}
	.awards {
		height: 20%;

		img {
			filter: grayscale(1);
			mix-blend-mode: multiply;
			max-height: 100px;
			padding: 20px 0;
		}
	}

	img {
		@apply h-full;
	}
</style>

<div class="w-full min-h-screen bg-gray-100 lg:h-screen md:h-auto hero">
	<Flex cols="true" justify="evenly" classes="w-full min-h-screen">
		<div class="header">
			<Flex wrap="true" align="center" classes="header lg:h-full">
				<div class="h-full md:w-full lg:w-1/3">
					<Flex justify="center" align="center" classes="w-full h-full">
						<div class="w-full">
							<h2 class="font-black text-blue-900 h1">{header}</h2>
							<p class="my-4 text-sm">{subHeader}</p>
							<Button buttonText="{buttonText}" classes="w-56" link="true" href="{href}" />
							<p class="my-4 text-xs text-gray-800">{note}</p>
						</div>
					</Flex>
				</div>
				<div class="h-full py-4 md:w-full lg:w-2/3 right lg:pl-10">
					<ShadowImage src="{image}" />
				</div>
			</Flex>
		</div>
		<div class="awards">
			<Flex wrap="true" justify="between" align="center" classes="w-full h-full">
				{#each awards as award}
					<img src="{award}" alt="" class="h-full {awards.length <= 3 ? 'mx-auto' : ''}" />
				{/each}
			</Flex>
		</div>
	</Flex>
	<DashBackground />
</div>
