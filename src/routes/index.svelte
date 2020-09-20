<script>
	import Calender from '../components/Calender.svelte';
	import Hero from '../components/Hero.svelte';
</script>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>
<Hero
	classes="bg-gray-200"
	title="Louise Schroeder Gymnasium"
	subtitle="Naturwissenschaftlich-technologisches und sprachliches Gymnasium" />
<Calender />
