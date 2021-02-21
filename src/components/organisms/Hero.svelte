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

<div class="" style="background: #f6f9fc;margin-top: -80px;">
	<Section>
		<header class="flex flex-nowrap justify-between w-full" style="min-height: 80vh; padding-top: 40px;">
			<div class="z-10 flex flex-col items-center justify-center w-1/2">
				<div class="m-12 ml-0 mr-24" style="max-width: 500px">
					<h1 class="text-3xl break-normal text-heading" style="line-height: 52px;">{header}</h1>
					<h3 class="my-4 text-xl" style="font-weight: 900; line-height: 30px;">{subHeader}</h3>
					<Button buttonText="{buttonText}" href="{buttonLink}" classes="w-40" />
					<p style="margin-top: 40px; font-size: 14px" class="text-gray-700">{note}</p>
				</div>
			</div>
			<div class="z-10 flex flex-col items-center justify-center w-full">
				<div class="w-full" style="padding: 10vh 0;height:85vh;">
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
