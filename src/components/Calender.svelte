<script>
	import Section from './Section.svelte';
	import Card from './Card.svelte';
	import Flex from './Flex.svelte';
</script>

<Section fullscreen="true" classes="bg-gray-100 center text-center">
	<Flex cols="true" justify="center" align="center">
		<h2>{process.globals.currentEvents}</h2>
		<p>{process.globals.currentEventsSub}</p>
		<Card>
			<Flex align="center">
				<span>{process.globals.time}</span>
				<span>{process.globals.date}</span>
				<span>{process.globals.content}</span>
			</Flex>
			<!-- <Flex>
				<div><span>9:00</span> <span>9:30</span></div>
				<div>13.08.2020</div>
				<div>Einsichtnahme in die korrigierten schriftlichen Abituraufgaben unter Aufsicht</div>
			</Flex>
			<Flex>
				<div><span>----</span></div>
				<div>24.07.2020</div>
				<div>Q11/2: Vollversammlung: mit Zeugnisausgabe (ausgenommen Ersatzprüflinge)</div>
			</Flex>
			<Flex>
				<div><span>----</span></div>
				<div>24.07.2020</div>
				<div>05-10: Ausgabe der Jahreszeugnisse (ausgenommen Ersatzprüflinge)</div>
			</Flex>
			<Flex>
				<div><span>10:00</span></div>
				<div>24.07.2020</div>
				<div>
					Termin für die schriftliche Abmeldung von der Schule bei Schulwechsel oder Übertritt ins Berufsleben
				</div>
			</Flex>
			<Flex>
				<div><span>10:00</span></div>
				<div>24.07.2020</div>
				<div>
					Termin für die schriftliche Abmeldung vom Religionsunterricht, um am Ethikunterricht teilnehmen zu
					können.
				</div>
			</Flex> -->
		</Card>
	</Flex>
</Section>
