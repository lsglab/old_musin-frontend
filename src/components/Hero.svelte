<script>
	import Button from './common/Button.svelte';
	import DashBackground from './DashBackground.svelte';
	import Flex from './common/Flex.svelte';
	import Section from './Section.svelte';
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
		padding-top: 70px; /* only temporarly until the nav comes */
		* {
			z-index: 2;
		}
	}
	.awards {
		img {
			filter: grayscale(1);
			mix-blend-mode: multiply;
			padding: 20px 0;
			max-height: 120px;
		}
	}

	img {
		@apply h-full;
	}
</style>

<!--
	@component
	Gives you a hero page with an image, awards section and custom text
-->

<Section classes="w-full bg-gray-100 md:h-auto main lg:h-screen" padding="true">
	<Flex cols="true" justify="evenly" classes="w-full h-full">
		<div class="header h-8/10">
			<Flex wrap="true" align="center" classes="header lg:h-full">
				<div class="h-full text-center md:w-full lg:w-1/3">
					<Flex justify="center" align="center" classes="w-full h-full">
						<div class="w-full text-center lg:text-left xl:text-left">
							<h2 class="font-black text-blue-900 h1">{header}</h2>
							<p class="my-4 text-sm">{subHeader}</p>
							<Button buttonText="{buttonText}" classes="w-56" href="{href}" />
							<p class="my-4 text-xs text-gray-800">{note}</p>
						</div>
					</Flex>
				</div>
				<div class="h-full py-4 md:w-full lg:w-2/3 right lg:pl-10">
					<Flex
						justify="center"
						align="center"
						classes="w-full h-full overflow-hidden shadow-2xl rounded-lg">
						<img class="object-cover w-full h-full" src="{image}" alt="" />
					</Flex>
				</div>
			</Flex>
		</div>
		<div class="hidden awards h-2/10 lg:block xl:block">
			<Flex wrap="true" justify="between" align="center" classes="w-full h-full">
				{#each awards as award}
					<img src="{award}" alt="" class="h-full {awards.length <= 3 ? 'mx-auto' : ''}" />
				{/each}
			</Flex>
		</div>
	</Flex>
	<DashBackground />
</Section>
