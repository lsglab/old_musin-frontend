<script>
	import Awards from '../components/Awards.svelte';
	import Calender from '../components/Calender.svelte';
	import Flex from '../components/common/Flex.svelte';
	import Hero from '../components/Hero.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<Flex cols="true" justify="between" classes="w-full h-full bg-gray-200">
	<Nav />
	<Hero
		title="Louise Schroeder Gymnasium"
		subtitle="Naturwissenschaftlich-technologisches und sprachliches Gymnasium"
		to="termine" />
	<Awards />
</Flex>
<Calender />
