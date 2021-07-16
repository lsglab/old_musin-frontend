export const alignment = {
	comps: [],
	desc: 'Diese Komponenten dienen dazu andere richtig anzuordnen (e.g horizontal, veritkal, Platz dazwischen, etc..)',
	icon: 'align_horizontal_left',
	name: 'Anordnung',
};

export const cards = {
	comps: [
		{
			component: 'BioCard',
			desc: 'Card die am besten für Personen mit einer Biographie verwendet wird',
			name: 'Biographie Card',
		},
		{
			component: 'MensaCard',
			desc: 'Card die als child Component für einen Secitonwrapper der Mensa Seite gedacht ist',
			name: 'Mensa Card',
		},
		{
			component: 'StaffCard',
			desc:
				'Card die nur aus Bild, Name und Rolle eines Mitarbeiters besteht. Perfekt um Personen kompakt darzustellen',
			name: 'Staff Card',
		},
	],
	desc: 'Cards mit shadow die für verschiedene Zwecke benutzt werden können',
	icon: 'recent_actors',
	name: 'Floating Cards',
};

export const sections = {
	comps: [
		{
			component: 'AboutSection',
			desc: 'Keine ahnung',
			name: 'About Section',
		},
		{
			component: 'SectionWrapper',
			desc: 'Eigenet sich perfekt als Section nach einem Hero um mehr Informationen anzuzeigen',
			name: 'Hero Section',
		},
	],
	desc:
		'Sections dienen dazu eine Seite in mehrere Bereiche einzuteilen, sie bestehen meist aus einem header, subHeader und einem slot in den der Inhalt der Seciton kommt',
	icon: 'view_day',
	name: 'Sections',
};

export const templates = {
	comps: [
		{
			component: 'TestHero',
			desc: 'Komponent der als Startseite geeignet ist',
			name: 'Startseite',
		},
		{
			component: 'Calender',
			desc: 'Der Kalender zeigt alle Termine des LSG an',
			name: 'Kalender',
		},
	],
	desc: 'Templates sind schon fertige/fast fertige Seiten die nur noch befüllt werden müssen',
	icon: 'web',
	name: 'Templates',
};

export const images = {
	comps: [
		{
			component: 'AwardImage',
			desc: 'Award Images eigenen sich dazu Logos von Firmen oder änlichem anzuzeigen',
			name: 'Award Image',
		},
	],
	desc: 'Komponenten, die Bilder auf unterschiedliche Art und Weise darstellen',
	icon: 'image',
	name: 'Bilder',
};

export const text = {
	comps: [
		{
			component: 'Article',
			desc: 'Artikel sind für lange, gegliederte Textabschnitte gedacht',
			name: 'Artikel',
		},
		{
			component: 'ArticleSection',
			desc: 'Eine Sektion eines Artikels',
			name: 'Artikel Sektion',
		},
	],
	desc: 'Komponent um Text darzustellen',
	icon: 'article',
	name: 'Text',
};
