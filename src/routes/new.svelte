<script>
	import { files, page, pageTable } from '../stores';
	import { onMount, tick } from 'svelte';
	import Component from '../components/cms/organisms/Component.svelte';
	import EditComponent from '../cms/SiteEditor/EditComponent';
	import Empty from '../components/cms/atoms/Empty.svelte';

	// IMPORTS
	import AboutSection from '../components/frontend/molecules/aboutSection.svelte';
	import AwardImage from '../components/frontend/atoms/AwardImage.svelte';
	import BioCard from '../components/frontend/molecules/bioCard.svelte';
	import Calender from '../components/frontend/molecules/Calender.svelte';
	import Flex from '../components/both/atoms/Flex.svelte';
	import MensaCard from '../components/frontend/molecules/MensaCard.svelte';
	import SectionWrapper from '../components/frontend/molecules/sectionWrapper.svelte';
	import StaffCard from '../components/frontend/molecules/staffCard.svelte';
	import TestHero from '../components/frontend/organisms/TestHero.svelte';
	import request from '../cms/Utils/requests';

	const components = [
		BioCard,
		TestHero,
		AwardImage,
		Empty,
		Calender,
		SectionWrapper,
		AboutSection,
		MensaCard,
		StaffCard,
		Flex,
	];

	let initialized = false;
	let reload = false;
	let layout;

	async function fetchData() {
		const res = await request(`${process.globals.apiUrl}/files?_norelations=true&public=true`, 'get', {}, true);

		if (!res.error) {
			files.set(res.data.files);
		}
	}

	function sendLayoutUpdate() {
		const event = new CustomEvent('c_update', { detail: layout });
		window.parent.document.dispatchEvent(event);
	}

	onMount(() => {
		window.document.addEventListener(
			'c_created',
			(e) => {
				layout = e.detail;
			},
			false
		);

		window.document.addEventListener(
			'c_resume',
			(e) => {
				const blueprint = e.detail.blueprint;
				layout = new EditComponent(e.detail.table, e.detail.page.id).createFromData(
					blueprint,
					components,
					null
				);
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_new',
			() => {
				layout = new EditComponent(Empty, undefined);
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_fetched',
			(e) => {
				pageTable.set(e.detail.table);
				page.set(e.detail.page);
			},
			false
		);

		window.document.addEventListener(
			'c_reload',
			async () => {
				reload = true;
				await tick();
				reload = false;
			},
			false
		);

		fetchData();

		const compEvent = new CustomEvent('components', { detail: components });
		window.parent.document.dispatchEvent(compEvent);

		const mountEvent = new CustomEvent('iframe_mounted', { detail: {} });
		window.parent.document.dispatchEvent(mountEvent);
	});
</script>

{#if initialized === true && reload === false}
	<Component bind:component="{layout}" on:update="{sendLayoutUpdate}" />
{/if}
