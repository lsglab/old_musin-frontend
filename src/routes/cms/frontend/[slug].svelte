<script context="module">
	import { compConfig } from '../../../stores';
	import { onMount, tick } from 'svelte/internal';
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
	let table;
	let data;
	let errors = {};
	let disabled = false;
	let initialized = false;
	let domLoaded = false;

	let layout;

	async function fetchTable() {
		const res = await request(`${process.globals.apiUrl}/tables?table=sites`, 'get', {}, true);

		if (res.status === 200) {
			table = new Table(res.data.tables[0]);
		}
	}

	function setData() {
		data.filename = data.filename.split('.')[0];
	}

	async function fetchData() {
		if (id === 'new') {
			data = {
				id: 'new',
				path: '',
				public: false,
			};
			return;
		}

		const res = await request(`${process.globals.apiUrl}/sites?id=${id}`, 'get', {}, true);

		if (res.status === 200) {
			data = res.data.sites[0];
			setData();
		}
	}

	async function deleteSite() {
		await request(`${process.globals.apiUrl}/sites?id=${id}`, 'delete', {}, true);

		window.history.go(-1);
	}

	function afterSaving() {
		let event = new CustomEvent('c_stop_saving');
		document.getElementById('iframe').contentDocument.dispatchEvent(event);

		// make content editable again
		event = new CustomEvent('c_reload');
		document.getElementById('iframe').contentDocument.dispatchEvent(event);

		disabled = false;
	}

	async function saveData(body) {
		disabled = true;
		const res = await request(`${process.globals.apiUrl}/sites?id=${id}`, 'put', body, true);

		if (res.status === 200) {
			data = res.data.sites[0];
			setData();
			errors = {};
		} else if (res.status === 400) {
			errors = res.data;
		}
		afterSaving();
	}

	async function createData(body) {
		disabled = true;
		const res = await request(`${process.globals.apiUrl}/sites`, 'post', body, true);

		if (res.status === 200) {
			window.location = window.location.toString().replace('new', res.data.sites[0].id);
			errors = {};
		} else if (res.status === 400) {
			errors = res.data;
		}

		afterSaving();
	}

	async function prepareData() {
		const component = layout;

		const doc = document.getElementById('iframe').contentWindow.document;
		// get the document of the i frame
		const reqData = {};

		const event = new CustomEvent('c_start_saving');
		document.getElementById('iframe').contentDocument.dispatchEvent(event);

		if (table.getColumnPermission(data.id, 'blueprint')) reqData.blueprint = JSON.stringify(component.save(doc));
		if (table.getColumnPermission(data.id, 'filename')) reqData.filename = `${data.filename}.html`;
		if (table.getColumnPermission(data.id, 'path')) reqData.path = data.path;
		if (table.getColumnPermission(data.id, 'public')) reqData.public = data.public;
		// wait till dom is updated
		await tick();

		const string = document.getElementById('iframe').contentWindow.document.children[0].innerHTML;
		reqData.html = ` ${string}`.slice(1);

		console.log(reqData.html);
		return reqData;
	}

	async function create() {
		createData(await prepareData());
	}

	async function save() {
		saveData(await prepareData());
	}

	function publish() {
		data.public = true;
		save();
	}

	function unpublish() {
		data.public = false;
		save();
	}

	function getError(inputName) {
		return errors[inputName] !== undefined ? errors[inputName][0] : false;
	}

	async function fetch() {
		if (domLoaded !== true) return;

		// wait till iframe is mounted so that all events work
		window.document.addEventListener('iframe_mounted', async () => {
			await fetchTable();
			await fetchData();

			let event = new CustomEvent('c_fetched', { detail: { page: data, table } });
			document.getElementById('iframe').contentWindow.document.dispatchEvent(event);

			if (id !== 'new') {
				/* for some reason this has to be parsed twice ??? */
				const blueprint = JSON.parse(JSON.parse(data.blueprint));

				event = new CustomEvent('c_resume', { detail: { blueprint, page: data, table } });
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			} else {
				event = new CustomEvent('c_new', {});
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			}
		});
	}

	onMount(() => {
		domLoaded = true;

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

	function sendLayoutUpdate() {
		layout = layout;
		const event = new CustomEvent('c_created', { detail: layout });
		document.getElementById('iframe').contentDocument.dispatchEvent(event);
	}
</script>

<TopNav>
	{#if table !== undefined && data !== undefined}
		<Flex>
			{#if id === 'new' && table.getPermissions(id).create}
				<Button disabled="{disabled}" buttonFunction="{create}" classes="h-full w-32">Erstellen</Button>
			{:else}
				{#if table.getPermissions(id).edit}
					<Button disabled="{disabled}" buttonFunction="{save}" classes="h-full w-32">Speichern</Button>
				{/if}
				{#if table.getPermissions(id).delete}
					<Button buttonFunction="{deleteSite}" classes="h-full w-32 ml-4" color="bg-cmsErrorRed">
						Löschen
					</Button>
				{/if}
			{/if}
		</Flex>
		{#if id !== 'new' && table.getColumnPermission(id, 'public')}
			{#if !data.public}
				<Button buttonFunction="{publish}" color="bg-cmsSuccessGreen" classes="h-full w-32">
					Veröffentlichen
				</Button>
			{:else}
				<Button classes="h-full w-32" buttonFunction="{unpublish}">Unpublish</Button>
			{/if}
		{/if}
	{:else}
		<Loading diameter="8" />
	{/if}
</TopNav>
<Flex classes="w-full">
	<div class="w-9/12">
		<Flex classes="h-1/10 pl-4 border-b-2 border-gray-300" align="center">
			{#if data !== undefined && table !== undefined}
				<Input
					placeholder="Pfad der Seite"
					readonly="{table.getReadOnly(id, 'path')}"
					inputClasses="w-60"
					bind:value="{data.path}"
					error="{getError('path', errors)}"
					type="text"
					id="path" />
				<Input
					placeholder="Name der Seite"
					readonly="{table.getReadOnly(id, 'filename')}"
					inputClasses="w-60"
					bind:value="{data.filename}"
					error="{getError('filename', errors)}"
					type="text"
					id="name" />
			{:else}
				<Loading diameter="8" />
			{/if}
		</Flex>
		<div class="relative overflow-x-hidden h-9/10 resize-vertical">
			<iframe id="iframe" src="/new" title="New site" class="absolute top-0 w-full h-full"></iframe>
		</div>
	</div>
	<div class="w-3/12 pr-2 overflow-y-scroll border-l-2 border-gray-300 border-solid full-minus-nav max">
		{#if layout !== undefined && initialized && table !== undefined && data !== undefined}
			<Node on:update="{sendLayoutUpdate}" bind:component="{layout}" table="{table}" page="{data}" />
		{/if}
	</div>
</Flex>
