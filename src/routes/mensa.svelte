<script>
	import Mensa from '../components/templates/mensa.svelte';
</script>

<svelte:head>
	<title>LSG | Mensa</title>
</svelte:head>

<Mensa
	header="Mensa"
	subHeader="Im Schulzentrum an der Pfarrer-Grimm-Straße"
	img="https://www.sueddeutsche.de/image/sz.1.4597462/1200x675?v=1568217013"
	buttonText="Mehr Informationen"
	buttonLink="mensa/#information"
	awards="{['https://lsg.musin.de/homepage/images/Mensa/Mensa-Logo.jpg']}"
	sectionHeader="Informationen"
	sectionSubHeader="Alle wichtigen Information über die Mensa"
	linkText="Aktuelle Informationen"
	href="https://lsg.musin.de/homepage/images/Mensa/aktuelles.pdf"
	id="information"
	images="{[{ header: 'Speiseplan der Woche', img: 'https://lsg.musin.de/homepage/images/Mensa/_N4O8600_mini.jpg', link: 'https://lsg.musin.de/homepage/images/Mensa/speiseplan.pdf' }, { header: 'Mensa Kräutergarten', img: 'https://lsg.musin.de/homepage/images/Mensa/Artikel-9_mini.jpg', link: 'https://lsg.musin.de/homepage/9-home/92-kraeutergarten' }]}" />
