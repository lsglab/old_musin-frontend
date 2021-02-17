<script>
	import Flex from '../atoms/Flex.svelte';
	import Hero from '../organisms/Hero.svelte';
	import MensaImage from '../atoms/MensaImage.svelte';
	import SectionWrapper from '../molecules/sectionWrapper.svelte';

	export let header = '';
	export let subHeader = '';
	export let img = '';
	export let buttonText = '';
	export let buttonLink = '';
	export let awards = '';
	export let sectionHeader = '';
	export let sectionSubHeader = '';
	export let linkText = '';
	export let link = '';
	export let id = '';
	export let images = [];
</script>

<svelte:head>
	<title>LSG | Mensa</title>
</svelte:head>

<Hero
	header="{header}"
	subHeader="{subHeader}"
	img="{img}"
	buttonText="{buttonText}"
	buttonLink="{buttonLink}"
	awards="{awards}" />
<SectionWrapper header="{sectionHeader}" subHeader="{sectionSubHeader}" linkText="{linkText}" link="{link}" id="{id}">
	<Flex classes="w-full" wrap="true" justify="between">
		{#each images as image}
			<MensaImage header="{image.header}" image="{image.img}" href="{image.link}" />
		{/each}
	</Flex>
</SectionWrapper>
