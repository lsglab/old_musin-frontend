<script>
	import Button from './common/Button.svelte';
	import Flex from './common/Flex.svelte';
	import DashBackground from './DashBackground.svelte';
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
		height: 80%;
		padding-top: 70px;

		* {
			z-index: 2;
		}
	}
	.awards {
		height: 20%;

		img {
			filter: grayscale(1);
			mix-blend-mode: multiply;
			padding: 20px 0;
			max-height: 100px;
		}
	}

	img {
		@apply h-full;
	}
</style>

<Section classes="w-full bg-gray-100 lg:h-screen md:h-auto" padding="0 10%">
	<Flex cols="true" justify="evenly" classes="w-full h-full">
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
					<Flex justify="center" align="center" classes="w-full h-full overflow-hidden shadow-2xl rounded-lg">
						<img class="object-cover w-full h-full" src="{image}" alt="" />
					</Flex>
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
</Section>
