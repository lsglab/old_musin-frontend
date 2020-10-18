<script>
	import Card from './common/Card.svelte';
	import Flex from './common/Flex.svelte';
	import Link from './common/Link.svelte';
	import Section from './Section.svelte';

	export let title;
</script>

<style>
	h4 {
		font-size: 1em;
		text-align: center;
	}
	p {
		font-size: 0.9em;
	}
</style>

<Section fullscreen="true" classes="bg-rect-pattern bg-fixed bg-no-repeat" id="carddeck">
	<div>
		<h4 class="mb-2">{title}</h4>
		<Flex wrap="true" justify="center" align="center" classes="px-2 gap-4">
			<Card>
				<div slot="header">
					<h4>Organisatorisches</h4>
				</div>
				<div slot="body" class="rounded-md bg-gray-400">
					<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full">
						<Link class="w-1/5" href="https://losgymuc.eltern-portal.org">Elternportal</Link>
						<Link class="w-1/5" href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/IfsG.pdf">
							Infektionsschutz
						</Link>
						<Link
							class="w-1/5"
							href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/Krankmeldebogen.pdf">
							Krankmeldebogen gem. §34 Infektionsschutzgesetz
						</Link>
						<Link
							class="w-1/5"
							href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Auslandsaufenthalt.pdf">
							Auslandsaufenthalte: Angebote und Fahrten des LSG
						</Link>
						<Link
							class="w-1/5"
							href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Elterninformationsabend.pdf">
							Beurlaubung zum Auslandsaufenthalt
						</Link>
					</Flex>
				</div>
				<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
			</Card>

			<Card>
				<div slot="header">
					<h4>Informationsabend zur Einschreibung 2020</h4>
				</div>
				<div slot="body" class="rounded-md bg-gray-400 max-w-sm">
					<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full">
						<p>
							Wegen der Corona-Krise entfällt der Informationsabend zur Einschreibung für die neuen 5.
							Klassen!
						</p>
						<p>
							Wichtige Informationen dazu und zu unseren pädagogischen Konzepten entnehmen Sie bitte
							dieser
							<Link
								class="w-1/5"
								href="https://lsg.musin.de/homepage/images/schulverwaltung/einschreibung/Infoabend_zur_Einschreibung_2020.pdf">
								Präsentation
							</Link>
						</p>
						<!--Bullet points?-->
					</Flex>
				</div>
				<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
			</Card>

			<Card>
				<div slot="header">
					<h4>Konzepte</h4>
				</div>
				<div slot="body" class="rounded-md bg-gray-400">
					<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full">
						<Link
							class="w-1/5"
							href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Lerncoaching_fr_Schlerinnen_und_Schler_fr_Homepage_LSG.pdf">
							Lerncoaching am LSG
						</Link>
						<Link
							class="w-1/5"
							href="https://www.km.bayern.de/eltern/lernen/lernschwierigkeiten/rechenschwierigkeiten.html">
							Informationen und Beratung bei Rechenschwierigkeiten (KM Bayern)
						</Link>
						<Link
							class="w-1/5"
							href="https://www.km.bayern.de/eltern/lernen/lernschwierigkeiten/lese-rechtschreibschwierigkeiten.html">
							Informationen und Beratung bei Lese-Rechtschreibschwierigkeiten (KM Bayern)
						</Link>
					</Flex>
				</div>
				<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
			</Card>
		</Flex>
	</div>
</Section>
