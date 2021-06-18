<script context="module">
	/* eslint-disable import/first */
	import { compConfig, layout } from '../../../stores';
	import { onMount } from 'svelte/internal';
	import Button from '../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../components/both/atoms/Flex.svelte';
	import Input from '../../../components/both/molecules/Input.svelte';
	import Loading from '../../../components/cms/atoms/Loading.svelte';
	import Node from '../../../components/cms/molecules/Node.svelte';
	import Table from '../../../cms/Tables/table';
	import TopNav from '../../../components/cms/molecules/TopNav.svelte';
	import request from '../../../cms/Utils/requests';

	export async function preload({ params }) {
		const id = params.slug;

		return { id };
	}
</script>

<script>
	export let id;
	let cUpdate = false;
	let table;
	let data;

	async function fetchTable() {
		const res = await request(`${process.globals.apiUrl}/tables?table=sites`, 'get', {}, true);

		if (res.status === 200) {
			table = new Table(res.data.tables[0]);
		}
	}

	async function fetchData() {
		if (id === 'new') {
			data = {};
			return;
		}

		const res = await request(`${process.globals.apiUrl}/sites?id=${id}`, 'get', {}, true);

		if (res.status === 200) {
			data = res.data.sites[0];
		}
	}

	onMount(() => {
		window.document.addEventListener(
			'components',
			(e) => {
				compConfig.set(e.detail);
			},
			false
		);

		window.document.addEventListener(
			'c_update',
			(e) => {
				cUpdate = true;
				layout.set(e.detail);
			},
			false
		);

		layout.subscribe((ele) => {
			if (!cUpdate) {
				const event = new CustomEvent('c_created', { detail: ele });
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			} else {
				cUpdate = false;
			}
		});
		fetchTable();
		fetchData();
	});
</script>

<TopNav>
	{#if table !== undefined}
		<Input
			placeholder="Pfad der Seite"
			readonly="{table.getReadOnly(id, 'path')}"
			inputClasses="w-60"
			bind:value="{data.path}"
			type="text"
			id="path" />
		<Input
			placeholder="Name der Seite"
			readonly="{table.getReadOnly(id, 'filename')}"
			inputClasses="w-60"
			bind:value="{data.filename}"
			type="text"
			id="name" />
		{#if id === 'new'}
			<Button classes="h-full w-32" color="bg-cmsSuccessGreen">Speichern</Button>
		{/if}
	{:else}
		<Loading />
	{/if}
</TopNav>

<Flex classes="w-full">
	<div id="site" class="w-9/12">
		<iframe
			style="z-index: 1000;"
			id="iframe"
			src="/new"
			title="New site"
			class="w-full resize min-h-full-minus-nav"></iframe>
	</div>
	<div class="w-3/12 pr-2 border-l-2 border-gray-300 border-solid">
		{#if $layout !== 0}
			<Node component="{$layout}" />
		{/if}
	</div>
</Flex>
