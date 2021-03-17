<script>
	import Calender from '../../components/molecules/Calender.svelte';
	import SectionWrapper from '../../components/molecules/sectionWrapper.svelte';
	import SmallHero from '../../components/organisms/smallHero.svelte';
</script>

<SmallHero
	header="Elternbeirat"
	description="Sample text. Spaeter text einfuegen der die Funktionen des Elternbeirates beschreibt"
	buttonText="Kontaktieren sie uns"
	buttonLink="mailto:lsg.elternbeirat@yahoo.de"
	img="https://interiorpark.com/wp-content/uploads/2016/05/placeholder.png" />
<SectionWrapper
	header="Mitglieder"
	subHeader="Alle Mitglieder des Elternbeirates sowie deren Aufgaben (spaeter kommt da noch die richtige Tabelle hin)">
	<Calender />
</SectionWrapper>
