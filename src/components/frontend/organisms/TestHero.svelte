<script>
	import AwardImage from '../atoms/AwardImage.svelte';
	import Button from '../atoms/Button.svelte';
	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import Link from '../../../cms/SiteEditor/Inputs/Link';
	import Section from '../atoms/Section.svelte';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	export let blueprint = {
		button: new Link(),
		children: [AwardImage],
		header: new ShortText('Städtisches Louise Schroeder Gymnasium München'),
		img: new Img('https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg'),
		note: new ShortText('Referenzschule der TU München'),
		subHeader: new ShortText('Naturwissenschaftlich-technologisches und sprachliches Gymnasium.'),
	};
</script>

<style lang="scss">
	* {
		word-break: normal;
	}
</style>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<div style="margin-top: -80px;" class="bg-backgroundDark">
	<Section>
		<header
			class="flex flex-col w-full lg:justify-between flex-nowrap lg:flex-row"
			style="min-height: 80vh; padding-top: 40px;">
			<div class="z-20 flex flex-col justify-center w-full md:mt-10 lg:mt-0 lg:items-center lg:w-1/2">
				<div class="mt-12 lg:m-12 lg:ml-0 lg:mr-24" style="max-width: 500px">
					<h1 class="text-3xl leading-9 break-normal text-heading" id="{blueprint.header.id}">
						{blueprint.header.data}
					</h1>
					<h3 class="my-4 text-xl leading-5" style="font-weight: 900;" id="{blueprint.subHeader.id}">
						{blueprint.subHeader.data}
					</h3>
					<Button classes="min-w-40">
						<a
							id="{blueprint.button.id}"
							href="{blueprint.button.href}"
							class="inline-block w-full text-xs text-white">
							{blueprint.button.data}
						</a>
					</Button>
					<p class="mt-6 text-gray-700" style="font-size: 14px" id="{blueprint.note.id}">
						{blueprint.note.data}
					</p>
				</div>
			</div>
			<div class="z-10 flex flex-col items-center justify-center w-full">
				<div class="w-full my-10 h-52 md:my-16 lg:my-0 md:h-80 lg:py-10vh lg:h-85vh">
					<img
						id="{blueprint.img.id}"
						class="w-full h-full bg-cover shadow-lg rounded-xl"
						alt=""
						style="background-image: url('{blueprint.img.data}');" />
				</div>
			</div>
		</header>
	</Section>
	<Section customStyles="padding-bottom: 30px;" classes="dashedTopBorder hidden md:block">
		<div class="flex flex-row justify-between flex-grow w-full bg-transparent awards">
			<slot />
		</div>
	</Section>
</div>
