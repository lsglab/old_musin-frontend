import AboutSection from '../../components/frontend/molecules/aboutSection.svelte';
import AlignItems from '../../components/frontend/atoms/AlignItems.svelte';
import Article from '../../components/frontend/templates/article.svelte';
import ArticleSection from '../../components/frontend/atoms/ArticleSection.svelte';
import AwardImage from '../../components/frontend/atoms/AwardImage.svelte';
import BioCard from '../../components/frontend/molecules/bioCard.svelte';
import Calender from '../../components/frontend/molecules/Calender.svelte';
import Empty from '../../components/frontend/atoms/Empty.svelte';
import Footer from '../../components/frontend/organisms/Footer.svelte';
import MensaCard from '../../components/frontend/molecules/MensaCard.svelte';
import Nav from '../../components/frontend/organisms/Nav.svelte';
import NavMenuFix from '../../components/frontend/test/NavMenuFix.svelte';
import NavMenuItemFix from '../../components/frontend/test/NavMenuItemFix.svelte';
import SectionWrapper from '../../components/frontend/molecules/sectionWrapper.svelte';
import Slot from '../../components/frontend/atoms/Slot.svelte';
import SmallHero from '../../components/frontend/organisms/smallHero.svelte';
import StaffCard from '../../components/frontend/molecules/staffCard.svelte';
import Task from '../../components/frontend/atoms/task.svelte';
import TestFooter from '../../components/frontend/organisms/TestFooter.svelte';
import TestHero from '../../components/frontend/organisms/TestHero.svelte';
import TestNavFix from '../../components/frontend/test/TestNavFix.svelte';

export const alignment = {
	comps: [
		{
			component: 'AlignItems',
			description: 'Komponent um andere Komponenten anzuordnen',
			name: 'AlignItems',
		},
	],
	description:
		'Diese Komponenten dienen dazu andere richtig anzuordnen (e.g horizontal, veritkal, Platz dazwischen, etc..)',
	icon: 'align_horizontal_left',
	name: 'Anordnung',
};

export const cards = {
	comps: [
		{
			component: 'BioCard',
			description: 'Card die am besten für Personen mit einer Biographie verwendet wird',
			name: 'Biographie Card',
		},
		{
			component: 'MensaCard',
			description: 'Card die als child Component für einen Secitonwrapper der Mensa Seite gedacht ist',
			name: 'Mensa Card',
		},
		{
			component: 'StaffCard',
			description:
				'Card die nur aus Bild, Name und Rolle eines Mitarbeiters besteht. Perfekt um Personen kompakt darzustellen',
			name: 'Staff Card',
		},
	],
	description: 'Cards mit shadow die für verschiedene Zwecke benutzt werden können',
	icon: 'recent_actors',
	name: 'Floating Cards',
};

export const sections = {
	comps: [
		{
			component: 'AboutSection',
			description: 'Keine ahnung',
			name: 'About Section',
		},
		{
			component: 'SectionWrapper',
			description: 'Eigenet sich perfekt als Section nach einem Hero um mehr Informationen anzuzeigen',
			name: 'Hero Section',
		},
	],
	description:
		'Sections dienen dazu eine Seite in mehrere Bereiche einzuteilen, sie bestehen meist aus einem header, subHeader und einem slot in den der Inhalt der Seciton kommt',
	icon: 'view_day',
	name: 'Sections',
};

export const templates = {
	comps: [
		{
			component: 'TestHero',
			description: 'Komponent der als Startseite geeignet ist',
			name: 'Startseite',
		},
		{
			component: 'SmallHero',
			description: 'Simplere Startseite',
			name: 'Simple Startseite',
		},
		{
			component: 'Calender',
			description: 'Der Kalender zeigt alle Termine des LSG an',
			name: 'Kalender',
		},
		{
			component: 'Nav',
			description: 'Die Navigationsleiste',
			name: 'Navigationsleiste',
		},
		{
			component: 'TestFooter',
			description: 'Der Footer der Seite',
			name: 'Footer',
		},
	],
	description: 'Templates sind schon fertige/fast fertige Seiten die nur noch befüllt werden müssen',
	icon: 'web',
	name: 'Templates',
};

export const images = {
	comps: [
		{
			component: 'AwardImage',
			description: 'Award Images eigenen sich dazu Logos von Firmen oder änlichem anzuzeigen',
			name: 'Award Image',
		},
	],
	description: 'Komponenten, die Bilder auf unterschiedliche Art und Weise darstellen',
	icon: 'image',
	name: 'Bilder',
};

export const text = {
	comps: [
		{
			component: 'Article',
			description: 'Artikel sind für lange, gegliederte Textabschnitte gedacht',
			name: 'Artikel',
		},
		{
			component: 'ArticleSection',
			description: 'Eine Sektion eines Artikels',
			name: 'Artikel Sektion',
		},
		{
			component: 'Task',
			description: 'Ein task',
			name: 'Aufgabe',
		},
	],
	description: 'Komponent um Text darzustellen',
	icon: 'article',
	name: 'Text',
};

export const special = {
	comps: [
		{
			component: 'Slot',
			description: 'Slot component',
			name: 'Slot',
		},
		{
			component: 'Empty',
			description: 'Ein komplett leerer component',
			name: 'Empty',
		},
	],
	description: 'Spezielle Komponenten',
	icon: 'settings',
	name: 'Speziell',
};

export const nav = {
	comps: [
		{
			component: 'TestNavFix',
			description: 'Navbar',
			name: 'Nav',
		},
		{
			component: 'NavMenuFix',
			description: 'Sub Menu of nav',
			name: 'Nav Menu',
		},
		{
			component: 'NavMenuItemFix',
			description: 'Item of one Nav Menu',
			name: 'Nav Menu Item',
		},
	],
	description: 'Components for nav',
	icon: 'menu',
	name: 'Navbar',
};

export const allCategories = [alignment, cards, sections, templates, images, text, special, nav];

export const componentConfig = allCategories.flatMap((category) => category.comps);

export const components = {
	AboutSection,
	AlignItems,
	Article,
	ArticleSection,
	AwardImage,
	BioCard,
	Calender,
	Empty,
	Footer,
	MensaCard,
	Nav,
	NavMenuFix,
	NavMenuItemFix,
	SectionWrapper,
	Slot,
	SmallHero,
	StaffCard,
	Task,
	TestFooter,
	TestHero,
	TestNavFix,
};
