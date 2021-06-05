<script>
	import Flex from '../../components/both/atoms/Flex.svelte';
	import Hero from '../../components/frontend/organisms/Hero.svelte';
	import MensaCard from '../../components/frontend/molecules/MensaCard.svelte';
	import SectionWrapper from '../../components/frontend/molecules/sectionWrapper.svelte';
</script>

<svelte:head>
	<title>LSG | Mensa</title>
</svelte:head>

<Hero
	header="Mensa"
	subHeader="Im Schulzentrum an der Pfarrer-Grimm-Straße"
	img="https://www.sueddeutsche.de/image/sz.1.4597462/1200x675?v=1568217013"
	buttonText="Mehr Informationen"
	buttonLink="/schule/mensa/#information"
	awards="{['https://lsg.musin.de/homepage/images/Mensa/Mensa-Logo.jpg']}" />
<SectionWrapper
	header="Informationen"
	subHeader="Alle wichtigen Informationen über die Mensa"
	linkText="Aktuelle Informationen"
	link="https://lsg.musin.de/homepage/images/Mensa/aktuelles.pdf"
	id="information">
	<Flex classes="w-full" wrap="true" justify="center">
		<MensaCard
			header="Speiseplan der Woche"
			img="https://lsg.musin.de/homepage/images/Mensa/_N4O8600_mini.jpg"
			href="https://lsg.musin.de/homepage/images/Mensa/speiseplan.pdf" />
		<MensaCard
			header="Mensa Kräutergarten"
			img="https://lsg.musin.de/homepage/images/Mensa/Artikel-9_mini.jpg"
			href="https://lsg.musin.de/homepage/9-home/92-kraeutergarten" />
	</Flex>
</SectionWrapper>
