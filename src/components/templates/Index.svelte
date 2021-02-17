<script>
	import Calender from '../molecules/Calender.svelte';
	import Hero from '../organisms/Hero.svelte';
	import SectionWrapper from '../molecules/sectionWrapper.svelte';

	export let header = '';
	export let subHeader = '';
	export let note = '';
	export let img = '';
	export let awards = [];
	export let buttonText = '';
	export let buttonLink = '';
	export let sectionHeader = '';
	export let sectionSubHeader = '';
	export let linkText = '';
	export let link = '';
	export let id = '';
</script>

<Hero
	header="{header}"
	subHeader="{subHeader}"
	note="{note}"
	img="{img}"
	awards="{awards}"
	buttonText="{buttonText}"
	buttonLink="{buttonLink}" />
<SectionWrapper header="{sectionHeader}" subHeader="{sectionSubHeader}" linkText="{linkText}" link="{link}" id="{id}">
	<Calender />
</SectionWrapper>
