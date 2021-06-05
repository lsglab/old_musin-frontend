<script>
	/* eslint-disable import/first */

	import { layout } from '../stores';
	import { onMount } from 'svelte';
	import Component from '../components/cms/organisms/Component.svelte';
	import EditComponent from '../cms/SiteEditor/EditComponent';
	import Empty from '../components/cms/atoms/Empty.svelte';

	let cCreated = false;

	onMount(() => {
		layout.set(new EditComponent(Empty, undefined));

		layout.subscribe((ele) => {
			if (!cCreated) {
				console.log('iframe dispatch c_update', ele);
				const event = new CustomEvent('c_update', { detail: ele });
				window.parent.document.dispatchEvent(event);
			} else {
				cCreated = false;
			}
		});

		window.document.addEventListener(
			'c_created',
			(e) => {
				console.log('iframe receive c_created', e.detail);
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
