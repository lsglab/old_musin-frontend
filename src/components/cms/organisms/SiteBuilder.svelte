<script context="module">
	import { compConfig } from '../../../stores';
	import { onMount } from 'svelte/internal';
	import Button from '../atoms/Button.svelte';
	import ChooseComponent from './ChooseComponent.svelte';
	import DialogButton from '../molecules/DialogButton.svelte';
	import Flex from '../atoms/Flex.svelte';
	import GoBack from '../atoms/GoBack.svelte';
	import Loading from '../atoms/Loading.svelte';
	import Node from '../molecules/Node.svelte';
	import Table from '../../../cms/Tables/table';
	import TopNav from '../molecules/TopNav.svelte';
	import request from '../../../Utils/requests';
</script>

<script>
	export let id;

	export let prepareData = async () => {
		return {};
	};

	export let setNewData = () => {
		return {};
	};

	export let deleteCheck = () => {
		console.log('checking delte');
		return true;
	};

	export let tableName;
	export let errors = {};

	export let table;
	export let data;

	export let goback;

	export let chooseCustomComponents = false;
	export let useBase = false;
	export let customComponents;

	let disabled = false;
	let initialized = false;
	let domLoaded = false;

	let layout;

	async function fetchTable() {
		const res = await request(`${process.globals.apiUrl}/tables?table=${tableName}`, 'get', {}, true);

		if (res.status === 200) {
			table = new Table(res.data.tables[0]);
		}
	}

	async function fetchData() {
		if (id === 'new') {
			data = setNewData();
			return;
		}

		const res = await request(`${process.globals.apiUrl}/${tableName}?id=${id}`, 'get', {}, true);

		if (res.status === 200) {
			data = res.data[tableName][0];
		}
	}

	async function fetchCustomComponents() {
		const res = await request(`${process.globals.apiUrl}/components?_norelations=true`, 'get', {}, true);

		if (res.status === 200) {
			customComponents = res.data.components;
		}
	}

	async function deleteSite() {
		await request(`${process.globals.apiUrl}/${tableName}?id=${id}`, 'delete', {}, true);

		window.history.go(-1);
	}

	function afterSaving() {
		disabled = false;
	}

	async function saveData(body) {
		disabled = true;

		const res = await request(`${process.globals.apiUrl}/${tableName}?id=${id}`, 'put', body, true);

		if (res.status === 200) {
			data = res.data[tableName][0];
			errors = {};
		} else if (res.status === 400) {
			errors = res.data;
		}

		afterSaving();
	}

	async function createData(body) {
		disabled = true;

		const res = await request(`${process.globals.apiUrl}/${tableName}`, 'post', body, true);

		if (res.status !== 400) {
			// window.history.go(-1);
			errors = {};
		} else if (res.status === 400) {
			errors = res.data;
		}

		afterSaving();
	}

	async function prepare() {
		const component = layout;
		const reqData = {};

		const doc = document.getElementById('iframe').contentWindow.document;
		if (table.getColumnPermission(data.id, 'blueprint')) reqData.blueprint = JSON.stringify(component.save(doc));
		// wait till dom is updated
		return prepareData(reqData, component);
	}

	async function create() {
		createData(await prepare());
	}

	export const save = async () => {
		saveData(await prepare());
	};

	async function fetch() {
		if (domLoaded !== true) return;

		// wait till iframe is mounted so that all events work
		window.document.addEventListener('default_iframe_mounted', async () => {
			await fetchTable();
			await fetchData();
			await fetchCustomComponents();

			let event = new CustomEvent('c_fetched', { detail: { customComponents, page: data, table } });
			document.getElementById('iframe').contentWindow.document.dispatchEvent(event);

			if (id !== 'new') {
				const blueprint = JSON.parse(data.blueprint);

				event = new CustomEvent('c_resume', { detail: { blueprint, page: data, table } });
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			} else {
				event = new CustomEvent(useBase ? 'c_base_new' : 'c_new', {});
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			}
		});
	}

	onMount(() => {
		domLoaded = true;
		layout = undefined;

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
				layout = e.detail;
			},
			false
		);

		fetch();

		initialized = true;
	});

	async function sendLayoutUpdate() {
		console.log('updating');
		layout = layout;
		const event = new CustomEvent('c_created', { detail: layout });
		document.getElementById('iframe').contentDocument.dispatchEvent(event);
	}
</script>

<style>
	#iframe {
		width: inherit;
	}
</style>

<TopNav>
	{#if table !== undefined && data !== undefined}
		<Flex align="center">
			<GoBack href="{goback}" />
			{#if id === 'new' && table.getPermissions(id).create}
				<Button disabled="{disabled}" buttonFunction="{create}" classes="h-full w-32">Erstellen</Button>
			{:else}
				{#if table.getPermissions(id).edit}
					<Button disabled="{disabled}" buttonFunction="{save}" classes="h-full w-32">Speichern</Button>
				{/if}
				{#if table.getPermissions(id).delete && deleteCheck()}
					<DialogButton
						color="bg-cmsErrorRed"
						classes="h-full w-32 ml-4"
						dialogText="Sind sie sicher, dass sie diese Seite unwiederuflich löschen möchten?"
						buttonFunction="{deleteSite}">
						Löschen
					</DialogButton>
				{/if}
			{/if}
		</Flex>
		<slot name="buttons" />
	{:else}
		<Loading diameter="8" />
	{/if}
</TopNav>
<Flex classes="w-full">
	<div class="w-9/12">
		<Flex classes="h-1/10 px-4 border-b-2 border-gray-300" align="center">
			{#if data !== undefined && table !== undefined}
				<slot name="inputs" />
			{:else}
				<Loading diameter="8" />
			{/if}
		</Flex>
		<div class="w-full max-w-full overflow-x-hidden transition-none resize-x h-9/10">
			<iframe id="iframe" src="/new" title="New site" class="h-full max-w-full"></iframe>
		</div>
	</div>
	<div class="w-3/12 pl-0.5 pr-2 overflow-y-scroll border-l-2 border-gray-300 border-solid full-minus-nav max">
		{#if layout !== undefined && initialized && table !== undefined && data !== undefined && customComponents !== undefined}
			<div class="relative w-full h-full" id="node-container">
				<Node on:update="{sendLayoutUpdate}" bind:component="{layout}" table="{table}" page="{data}" />
			</div>
			<ChooseComponent
				on:update="{sendLayoutUpdate}"
				customComponents="{chooseCustomComponents ? customComponents : false}" />
		{/if}
	</div>
</Flex>
