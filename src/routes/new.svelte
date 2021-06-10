<script>
	/* eslint-disable import/first */

	import { layout } from '../stores';
	import { onMount } from 'svelte';
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

	const components = [
		BioCard,
		TestHero,
		AwardImage,
		Calender,
		SectionWrapper,
		AboutSection,
		MensaCard,
		StaffCard,
		Flex,
	];

	let cCreated = false;

	onMount(() => {
		layout.set(new EditComponent(Empty, undefined));

		const compEvent = new CustomEvent('components', { detail: components });
		window.parent.document.dispatchEvent(compEvent);

		layout.subscribe((ele) => {
			if (!cCreated) {
				console.log(ele);
				const event = new CustomEvent('c_update', { detail: ele });
				window.parent.document.dispatchEvent(event);
			} else {
				cCreated = false;
			}
		});

		window.document.addEventListener(
			'c_created',
			(e) => {
				cCreated = true;
				layout.set(e.detail);
			},
			false
		);
	});
</script>

{#if $layout !== 0}
	<Component component="{$layout}" />
{/if}
