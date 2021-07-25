<script context="module">
	import { files, page, pageTable } from '../stores';
	import { onMount, tick } from 'svelte';
	import Component from '../components/cms/organisms/Component.svelte';
	import ComponentClass from '../cms/SiteEditor/Component';
	import EditComponent from '../cms/SiteEditor/EditComponent';
	import Empty from '../components/cms/atoms/Empty.svelte';
	import Footer from '../components/frontend/organisms/Footer.svelte';
	import Nav from '../components/frontend/organisms/Nav.svelte';

	// IMPORTS
	import AboutSection from '../components/frontend/molecules/aboutSection.svelte';
	import Article from '../components/frontend/templates/article.svelte';
	import ArticleSection from '../components/frontend/atoms/ArticleSection.svelte';
	import AwardImage from '../components/frontend/atoms/AwardImage.svelte';
	import BioCard from '../components/frontend/molecules/bioCard.svelte';
	import Calender from '../components/frontend/molecules/Calender.svelte';
	import DisplayComponent from '../components/cms/atoms/DisplayComponent.svelte';
	import MensaCard from '../components/frontend/molecules/MensaCard.svelte';
	import SectionWrapper from '../components/frontend/molecules/sectionWrapper.svelte';
	import Slot from '../components/frontend/atoms/Slot.svelte';
	import StaffCard from '../components/frontend/molecules/staffCard.svelte';
	import TestFooter from '../components/frontend/organisms/TestFooter.svelte';
	import TestHero from '../components/frontend/organisms/TestHero.svelte';
	import request from '../cms/Utils/requests';
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
		MensaCard,
		StaffCard,
	];

	let initialized = false;
	let reload = false;
	let saving = false;
	let layout;

	let singleComponent = false;
	let site = false;

	let customComponents = [];

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

	function getComponent(name) {
		return components.find((comp) => comp.name === name);
	}

	function siteLoaded() {
		const event = new CustomEvent('site_loaded', {});
		window.parent.document.dispatchEvent(event);
	}

	function iframeMounted(mode) {
		const mountEvent = new CustomEvent(`${mode}_iframe_mounted`, { detail: {} });
		window.parent.document.dispatchEvent(mountEvent);
	}

	onMount(async () => {
		layout = undefined;
		const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

		if (params.component !== undefined) {
			singleComponent = getComponent(params.component);
			iframeMounted('component');
			return;
		}

		if (params.blueprint) {
			window.document.addEventListener(
				'create_blueprint',
				(e) => {
					customComponents = e.detail.customComponents;

					site = new ComponentClass().createFromData(e.detail.blueprint, components, customComponents, null);
				},
				false
			);

			iframeMounted('blueprint');
			return;
		}

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
				layout = new EditComponent().createFromData(blueprint, components, customComponents, null);
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_new',
			() => {
				const id = customComponents.find((comp) => comp.name === 'Base').id;

				const base = {
					children: [],
					id,
					isCustomComponent: true,
				};
				layout = new EditComponent().createFromData(base, components, customComponents, null);
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_fetched',
			async (e) => {
				pageTable.set(e.detail.table);
				page.set(e.detail.page);
				customComponents = e.detail.customComponents;
			},
			false
		);

		window.document.addEventListener(
			'c_start_saving',
			() => {
				saving = true;
			},
			false
		);

		window.document.addEventListener(
			'c_stop_saving',
			() => {
				saving = false;
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

		iframeMounted('default');
	});
</script>

{#if initialized === true && singleComponent === false && site === false}
	{#if reload === false}
		<Component bind:component="{layout}" on:update="{sendLayoutUpdate}" saving="{saving}" />
	{/if}
{:else if singleComponent !== false}
	<div class="m-4 pointer-events-none">
		<svelte:component this="{singleComponent}" />
	</div>
{:else if site !== false}
	<div class="pointer-events-none">
		<DisplayComponent component="{site}" on:loaded="{siteLoaded}" />
	</div>
{/if}
