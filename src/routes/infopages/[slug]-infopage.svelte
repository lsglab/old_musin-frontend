<script>
	import Carddeck from '../../components/Carddeck.svelte';
	import Infocard from '../../components/Infocard.svelte';
	import Link from '../../components/common/Link.svelte';
	import Nav from '../../components/Nav.svelte';

	export let title;
	// todo: have the infocard-set be determined by a dynamic parameter
	// todo: replace links: with content: and add links and paragraphs to content (to allow both to be intermixed)
	/* <p>Wegen der Corona-Krise entfällt der Informationsabend zur Einschreibung für die neuen 5. Klassen!</p>
			<p>
				Wichtige Informationen dazu und zu unseren pädagogischen Konzepten entnehmen Sie bitte dieser
				<Link
					class="w-1/5"
					href="https://lsg.musin.de/homepage/images/schulverwaltung/einschreibung/Infoabend_zur_Einschreibung_2020.pdf">
					Präsentation
				</Link>
			</p>
			<!--Bullet points?-->
	 */
	const infocards = [
		{
			component: Infocard,
			links: [
				{
					component: Link,
					href: 'https://losgymuc.eltern-portal.org',
					text: 'Elternportal',
				},
				{
					component: Link,
					href: 'https://lsg.musin.de/homepage/images/schulverwaltung/Recht/IfsG.pdf',
					text: 'Infektionsschutz',
				},
				{
					component: Link,
					href: 'https://lsg.musin.de/homepage/images/schulverwaltung/Recht/Krankmeldebogen.pdf',
					text: 'Krankmeldebogen gem. §34 Infektionsschutzgesetz',
				},
				{
					component: Link,
					href: 'https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Auslandsaufenthalt.pdf',
					text: 'Auslandsaufenthalte: Angebote und Fahrten des LSG',
				},
				{
					component: Link,
					href: 'https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Elterninformationsabend.pdf',
					text: 'Beurlaubung zum Auslandsaufenthalt',
				},
			],
			title: 'Organisatorisches',
		},
		{
			component: Infocard,
			links: [
				{
					component: Link,
					href:
						'https://lsg.musin.de/homepage/images/schulverwaltung/einschreibung/Infoabend_zur_Einschreibung_2020.pdf"',
					text: 'Präsentation',
				},
			],
			title: 'Informationsabend zur Einschreibung 2020',
		},
		{
			component: Infocard,
			links: [
				{
					component: Link,
					href:
						'https://lsg.musin.de/homepage/images/schulverwaltung/paedagogik/Lerncoaching_fr_Schlerinnen_und_Schler_fr_Homepage_LSG.pdf"',
					text: 'Lerncoaching am LSG',
				},
				{
					component: Link,
					href: 'https://www.km.bayern.de/eltern/lernen/lernschwierigkeiten/rechenschwierigkeiten.html',
					text: 'Informationen und Beratung bei Rechenschwierigkeiten (KM Bayern)',
				},
				{
					component: Link,
					href:
						'https://www.km.bayern.de/eltern/lernen/lernschwierigkeiten/lese-rechtschreibschwierigkeiten.html',
					text: 'Informationen und Beratung bei Lese-Rechtschreibschwierigkeiten (KM Bayern)',
				},
			],
			title: 'Konzepte',
		},
	];
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Nav />

<Carddeck title="Infoseite {title} | {process.globals.title}" cards="{infocards}" />
