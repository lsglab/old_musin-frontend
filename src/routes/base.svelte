<script context="module">
	import ComponentClass from '../cms/SiteEditor/Component';
	import Empty from '../components/cms/atoms/Empty.svelte';
	import Footer from '../components/frontend/organisms/Footer.svelte';
	import Nav from '../components/frontend/organisms/Nav.svelte';

	// IMPORTS
	import { onMount } from 'svelte';
	import AboutSection from '../components/frontend/molecules/aboutSection.svelte';
	import Article from '../components/frontend/templates/article.svelte';
	import ArticleSection from '../components/frontend/atoms/ArticleSection.svelte';
	import AwardImage from '../components/frontend/atoms/AwardImage.svelte';
	import BioCard from '../components/frontend/molecules/bioCard.svelte';
	import Calender from '../components/frontend/molecules/Calender.svelte';
	import DisplayComponent from '../components/cms/atoms/DisplayComponent.svelte';
	import MensaCard from '../components/frontend/molecules/MensaCard.svelte';
	import NavMenu from '../components/frontend/test/NavMenu.svelte';
	import NavMenuItem from '../components/frontend/test/NavMenuItem.svelte';
	import SectionWrapper from '../components/frontend/molecules/sectionWrapper.svelte';
	import Slot from '../components/frontend/atoms/Slot.svelte';
	import StaffCard from '../components/frontend/molecules/staffCard.svelte';
	import TestFooter from '../components/frontend/organisms/TestFooter.svelte';
	import TestHero from '../components/frontend/organisms/TestHero.svelte';
	import TestNav from '../components/frontend/test/TestNav.svelte';
</script>

<script>
	const components = [
		Article,
		ArticleSection,
		BioCard,
		TestHero,
		AwardImage,
		Empty,
		Footer,
		TestFooter,
		Calender,
		Slot,
		SectionWrapper,
		AboutSection,
		Nav,
		TestNav,
		NavMenu,
		NavMenuItem,
		MensaCard,
		StaffCard,
	];

	let site = false;

	const customComponents = [];

	if (process.globals.blueprint !== undefined) {
		site = new ComponentClass().createFromData(process.globals.blueprint, components, customComponents, null);
	}

	onMount(() => {
		window.document.addEventListener(
			'create_blueprint',
			(e) => {
				const code = document.scripts[0].innerHTML;
				const array = code.split('{');

				let finishedString = '';

				array.forEach((ele, i) => {
					if (array[i - 1] === 'globals:') {
						const string = `blueprint: ${JSON.stringify(e.detail.blueprint)},`;

						array[i] = ele.slice(0, 0) + string + ele.slice(1);
					}

					finishedString += `${i > 0 ? '{' : ''}${array[i]}`;
				});

				document.scripts[0].innerHTML = finishedString;
			},
			false
		);
	});
</script>

{#if site !== false}
	<DisplayComponent component="{site}" />
{/if}
