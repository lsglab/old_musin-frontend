<script>
	import Flex from '../components/common/Flex.svelte';
	import Hero from '../components/Hero.svelte';
	import HeroDown from '../components/heroDown.svelte';
	import MensaImage from '../components/MensaImage.svelte';
</script>

<svelte:head>
	<title>LSG | Mensa</title>
</svelte:head>

<Hero
	header="Mensa"
	subHeader="Im Schulzentrum an der Pfarrer-Grimm-Straße"
	image="https://www.zulassungs-express.de/wp-content/uploads/2019/11/placeholder.png"
	buttonText="Mehr Informationen"
	href="mensa/#information"
	awards="{['https://lsg.musin.de/homepage/images/Mensa/Mensa-Logo.jpg']}" />
<HeroDown
	header="Informationen"
	linkText="Aktuelle Informationen"
	href="https://lsg.musin.de/homepage/images/Mensa/aktuelles.pdf"
	id="information"
	padding="true">
	<Flex classes="w-full" wrap="true" justify="between">
		<MensaImage
			header="Speiseplan der Woche"
			image="https://lsg.musin.de/homepage/images/Mensa/_N4O8600_mini.jpg"
			href="https://lsg.musin.de/homepage/images/Mensa/speiseplan.pdf" />
		<MensaImage
			header="Mensa Kräutergarten"
			image="https://lsg.musin.de/homepage/images/Mensa/Artikel-9_mini.jpg"
			href="https://lsg.musin.de/homepage/9-home/92-kraeutergarten" />
	</Flex>
</HeroDown>
