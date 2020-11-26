<script>
	import Card from '../../components/common/Card.svelte';
	import DashBackground from '../../components/DashBackground.svelte';
	import Flex from '../../components/common/Flex.svelte';
	import Link from '../../components/common/Link.svelte';
	import SectionWrapper from '../../components/sectionWrapper.svelte';

	export let title;
</script>

<style lang="scss">
	h4 {
		@apply text-center text-lg;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<SectionWrapper header="Informationen für Eltern" subHeader="Louise-Schroeder-Gymnasium">
	<Flex wrap="true" justify="center" align="center" classes="px-2 my-5 gap-8 min-h-full w-full">
		<Card classes="z-10 bg-white">
			<div slot="header" class="py-1 bg-gray-200">
				<h4>Organisatorisches</h4>
			</div>
			<div slot="body" class="p-3">
				<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full text-justify">
					<Link href="https://losgymuc.eltern-portal.org">Elternportal</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/IfsG.pdf">
						Infektionsschutz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/Krankmeldebogen.pdf">
						Krankmeldebogen gem. §34 Infektionsschutzgesetz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Auslandsaufenthalt.pdf">
						Auslandsaufenthalte: Angebote und Fahrten des LSG
					</Link>
					<Link
						href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Elterninformationsabend.pdf">
						Beurlaubung zum Auslandsaufenthalt
					</Link>
				</Flex>
			</div>
		</Card>
		<Card classes="z-10 bg-white">
			<div slot="header" class="py-1 bg-gray-200">
				<h4>Organisatorisches</h4>
			</div>
			<div slot="body" class="p-3">
				<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full text-justify">
					<Link href="https://losgymuc.eltern-portal.org">Elternportal</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/IfsG.pdf">
						Infektionsschutz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/Krankmeldebogen.pdf">
						Krankmeldebogen gem. §34 Infektionsschutzgesetz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Auslandsaufenthalt.pdf">
						Auslandsaufenthalte: Angebote und Fahrten des LSG
					</Link>
					<Link
						href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Elterninformationsabend.pdf">
						Beurlaubung zum Auslandsaufenthalt
					</Link>
				</Flex>
			</div>
		</Card>
		<Card classes="z-10 bg-white">
			<div slot="header" class="py-1 bg-gray-200">
				<h4>Organisatorisches</h4>
			</div>
			<div slot="body" class="p-3">
				<Flex cols="true" wrap="true" justify="evenly" align="left" classes="px-2 w-full h-full text-justify">
					<Link href="https://losgymuc.eltern-portal.org">Elternportal</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/IfsG.pdf">
						Infektionsschutz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/Recht/Krankmeldebogen.pdf">
						Krankmeldebogen gem. §34 Infektionsschutzgesetz
					</Link>
					<Link href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Auslandsaufenthalt.pdf">
						Auslandsaufenthalte: Angebote und Fahrten des LSG
					</Link>
					<Link
						href="https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Elterninformationsabend.pdf">
						Beurlaubung zum Auslandsaufenthalt
					</Link>
				</Flex>
			</div>
		</Card>
	</Flex>
</SectionWrapper>
<DashBackground />
