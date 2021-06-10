<script>
	import Button from '../atoms/Button.svelte';
	import Flex from '../../both/atoms/Flex.svelte';

	import Section from '../atoms/Section.svelte';

	export let header;
	export let description;
	export let img;
	export let buttonText;
	export let buttonLink = '';
</script>

<div style="margin-top: -80px" class="bg-backgroundDark">
	<Section classes="py-10 pt-20">
		<Flex align="center" classes="flex-col lg:flex-row">
			<div class="self-center w-full my-5 lg:my-0 lg:mr-7 lg:w-1/2">
				<h3 class="mb-2 text-heading">{header}</h3>
				<p>{description}</p>
				<Flex wrap="true" classes="my-4">
					<Button buttonText="{buttonText}" classes="mr-4 my-2" href="{buttonLink}" />
				</Flex>
			</div>
			<div class="w-full lg:w-1/2"><img src="{img}" alt="" class="w-full h-full rounded-md shadow-lg" /></div>
		</Flex>
	</Section>
</div>

<svelte:options accessors="{true}" />
