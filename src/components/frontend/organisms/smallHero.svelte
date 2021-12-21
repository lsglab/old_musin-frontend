<script>
	import Button from '../atoms/Button.svelte';
	import Flex from '../atoms/Flex.svelte';

	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import Link from '../../../cms/SiteEditor/Inputs/Link';
	import Section from '../atoms/Section.svelte';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	export let blueprint = {
		button: new Link(),
		description: new ShortText('Beschreibung'),
		header: new ShortText('Titel'),
		img: new Img('https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg'),
	};
</script>

<div style="margin-top: -80px" class="bg-backgroundDark">
	<Section classes="py-10 pt-20">
		<Flex align="center" classes="flex-col lg:flex-row">
			<div class="self-center w-full my-5 lg:my-0 lg:mr-7 lg:w-1/2">
				<h3 class="mb-2 text-heading" id="{blueprint.header.id}">{blueprint.header.data}</h3>
				<p id="{blueprint.description.id}">{blueprint.description.data}</p>
				<Flex wrap="true" classes="my-4">
					<Button classes="mr-4 my-2">
						<a
							id="{blueprint.button.id}"
							href="{blueprint.button.href}"
							class="inline-block w-full text-xs text-white">
							{blueprint.button.data}
						</a>
					</Button>
				</Flex>
			</div>
			<div class="w-full lg:w-1/2">
				<img
					src="{blueprint.img.data}"
					id="{blueprint.img.id}"
					alt=""
					class="w-full h-full rounded-md shadow-lg" />
			</div>
		</Flex>
	</Section>
</div>

<svelte:options accessors="{true}" />
