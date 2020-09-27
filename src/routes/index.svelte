<script>
	import Calender from '../components/Calender.svelte';
	import Hero from '../components/Hero.svelte';
	import HeroDown from '../components/heroDown.svelte';
</script>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<Hero
	header="Städtisches Louise Schroeder Gymnasium München"
	subHeader="Naturwissenschaftlich-technologisches und sprachliches Gymnasium"
	buttonText="Aktuelle Termine"
	href="#termine"
	note="Referenzschule der TU München"
	image="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
	awards="{['https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg', 'https://lsg.musin.de/homepage/images/delf.jpg', 'https://lsg.musin.de/homepage/images/cae.png', 'https://lsg.musin.de/homepage/images/cils.png', 'https://lsg.musin.de/homepage/images/KombiLogo.png']}" />
<HeroDown
	header="Aktuelle Termine"
	subHeader="Alle demnächst anstehenden Termine des Louise-Schroeder-Gynasiums"
	linkText="Zur Terminübersicht"
	href="http://example.com/"
	id="termine">
	<Calender />
</HeroDown>
