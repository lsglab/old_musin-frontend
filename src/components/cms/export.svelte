<script>
	import { allComponents } from '../../cms/SiteEditor/Components';
	import Component from '../../cms/SiteEditor/Component';
	import DisplayComponent from './atoms/DisplayComponent.svelte';
	// IMPORTS
	import AboutSection from '../frontend/molecules/aboutSection.svelte';
	import AlignItems from '../frontend/atoms/AlignItems.svelte';
	import Article from '../frontend/templates/article.svelte';
	import ArticleSection from '../frontend/atoms/ArticleSection.svelte';
	import AwardImage from '../frontend/atoms/AwardImage.svelte';
	import BioCard from '../frontend/molecules/bioCard.svelte';
	import Calender from '../frontend/molecules/Calender.svelte';
	import Empty from './atoms/Empty.svelte';
	import Footer from '../frontend/organisms/Footer.svelte';
	import MensaCard from '../frontend/molecules/MensaCard.svelte';
	import Nav from '../frontend/organisms/Nav.svelte';
	import NavMenuFix from '../frontend/test/NavMenuFix.svelte';
	import NavMenuItemFix from '../frontend/test/NavMenuItemFix.svelte';
	import SectionWrapper from '../frontend/molecules/sectionWrapper.svelte';
	import Slot from '../frontend/atoms/Slot.svelte';
	import SmallHero from '../frontend/organisms/smallHero.svelte';
	import StaffCard from '../frontend/molecules/staffCard.svelte';
	import Task from '../frontend/atoms/task.svelte';
	import TestFooter from '../frontend/organisms/TestFooter.svelte';
	import TestHero from '../frontend/organisms/TestHero.svelte';
	import TestNavFix from '../frontend/test/TestNavFix.svelte';

	export let customComponents;

	export let data;

	const components = {
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

	const layout = new Component().createFromData(data, components, customComponents, allComponents, null);
</script>

<DisplayComponent component="{layout}" />
