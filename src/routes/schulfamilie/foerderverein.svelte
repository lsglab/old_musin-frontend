<script>
	import Flex from '../../components/atoms/Flex.svelte';
	import SectionWrapper from '../../components/molecules/sectionWrapper.svelte';
	import SmallHero from '../../components/organisms/smallHero.svelte';
	import Task from '../../components/atoms/task.svelte';
</script>

<SmallHero
	header="Förderverein"
	description="Unser Verein besteht aus ehemaligen Schülerinnen und Schülern, aus Eltern und Lehrkräften, ebenso unser derzeitiger Vorstand. Nach über 25 Jahren sind wir inzwischen ein fester, verlässlicher Bestandteil des Lebens an unserer Schule geworden, und die meisten kennen unsere Arbeit"
	buttonText="Mitglied werden"
	buttonLink="http://www.freunde-des-lsg.de/public/Flyer_FDLSG.pdf"
	img="https://interiorpark.com/wp-content/uploads/2016/05/placeholder.png" />
<SectionWrapper header="Unsere Arbeit" id="arbeit">
	<Flex justify="center" wrap="true">
		<Task
			classes="xl:w-1/3 md:w-1/2 w-full"
			header="Finanzieren"
			img="icon-paid"
			content="Wir gewähren Zuschüsse für Projekte wie den sprachlichen und muskalischen Austausch mit Schottland oder die literarische Woche. Außerdem finanzieren wir diverse Anschaffungen" />
		<Task
			classes="xl:w-1/3 md:w-1/2 w-full"
			header="Auszeichnen"
			img="icon-events"
			content="Wir prämieren herausragende Seminararbeiten auf der Abifeier und organisieren den LSG Ehrungsabend" />
		<Task
			classes="xl:w-1/3 md:w-1/2 w-full"
			header="Organisieren"
			img="icon-organise"
			content="Wir organisieren regelmäßig unsere Ehemaligentreffen und kümmern uns zudem um unsere Bläserklassen und sind bei fast allen Events der Schule für etwas verantwortlich" />
		<Task
			classes="xl:w-1/3 md:w-1/2 w-full"
			header="Gestalten"
			img="icon-design"
			content="Wir gestalten unsere Schule mit. So haben wir im Haupteingang einen repräsentativen Namenszug aus Metall gestiftet und das Oberstufenzimmer neu eingerichtet." />
	</Flex>
</SectionWrapper>
