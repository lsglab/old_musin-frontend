<script>
	import Awards from '../molecules/Awards.svelte';
	import Button from '../atoms/Button.svelte';
	import Section from '../atoms/Section.svelte';

	export let header = '';
	export let subHeader = '';
	export let note = '';
	export let img = '';
	export let awards = [];
	export let buttonText = '';
	export let buttonLink = '';
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
			<div class="z-10 flex flex-col justify-center w-full md:mt-10 lg:mt-0 lg:items-center lg:w-1/2">
				<div class="mt-12 lg:m-12 lg:ml-0 lg:mr-24" style="max-width: 500px">
					<h1 class="text-3xl leading-9 break-normal text-heading">{header}</h1>
					<h3 class="my-4 text-xl leading-5" style="font-weight: 900;">{subHeader}</h3>
					<Button buttonText="{buttonText}" href="{buttonLink}" classes="min-w-40">Termine</Button>
					<p class="mt-6 text-gray-700" style="font-size: 14px">{note}</p>
				</div>
			</div>
			<div class="z-10 flex flex-col items-center justify-center w-full">
				<div class="w-full my-10 h-52 md:my-16 lg:my-0 md:h-80 lg:py-10vh lg:h-85vh">
					<img
						class="w-full h-full bg-cover shadow-lg rounded-xl"
						alt=""
						style="background-image: url('{img}');" />
				</div>
			</div>
		</header>
	</Section>

	<Awards awards="{awards}" />
</div>
