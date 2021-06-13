<script>
	import Button from '../atoms/Button.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Input from '../../both/molecules/Input.svelte';
	import Loading from '../atoms/Loading.svelte';
	import Table from '../../../cms/Tables/table';
	import TopNav from './TopNav.svelte';
	import request from '../../../cms/Utils/requests';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let search = '';
	export let table;
	export let data;
	export let tableName;
	export let deleteAll = false;
	export let triggerDataReload = false;
	export let triggerTableReload = false;
	// default
	let deleteLength;
	let domLoaded = false;

	function fetched() {
		dispatch('fetched', {});
	}

	function changeDeletes() {
		if (data === undefined) return;
		data.forEach((ele, key) => {
			data[key].ctx_delete = deleteAll;
		});
	}

	async function fetchData(params) {
		data = undefined;
		let url = `${process.globals.apiUrl}/${tableName}?_norelations=true`;

		if (params !== undefined) {
			params.forEach((ele) => {
				url = `${url}&${ele}`;
			});
		}

		const res = await request(url, 'get', {}, true);

		if (!res.error) {
			data = res.data[tableName];
			changeDeletes();
		}
	}

	async function fetchTable() {
		table = undefined;

		const res = await request(`${process.globals.apiUrl}/tables?table=${tableName}`, 'get', {}, true);

		if (!res.error) {
			table = new Table(res.data.tables[0]);
		}
	}

	async function fetchAll() {
		await fetchData();
		await fetchTable();
		fetched();
	}

	async function reloadTable() {
		if (domLoaded === false || triggerTableReload === false) return;
		table = undefined;
		await fetchTable();
		triggerTableReload = false;
	}

	async function reloadData() {
		if (domLoaded === false || triggerDataReload === false) return;
		data = undefined;
		await fetchData();
		triggerDataReload = false;
	}

	async function reload() {
		if (domLoaded === false) return;
		data = undefined;
		table = undefined;
		fetchAll();
	}

	async function searchChanged() {
		if (domLoaded === false) return;
		fetchData([`_search=${search}`]);
	}

	async function deleteMultiple() {
		const ids = data.filter((ele) => ele.ctx_delete === true).map((ele) => ele.id);

		await request(`${process.globals.apiUrl}/${tableName}`, 'delete', { ids }, true);
		triggerDataReload = true;
	}

	$: deleteLength = data !== undefined ? data.filter((ele) => ele.ctx_delete === true).length : 0;
	$: searchChanged(search);
	$: changeDeletes(deleteAll);
	$: reload(tableName);
	$: reloadData(triggerDataReload);
	$: reloadTable(triggerTableReload);

	onMount(() => {
		domLoaded = true;
		fetchAll();
	});
</script>

<TopNav>
	<Input placeholder="Suche..." inputClasses="w-60" bind:value="{search}" id="search" type="text" />
</TopNav>

{#if data === undefined}
	<Flex classes="w-full full-minus-nav" justify="center" align="center">
		<Loading />
	</Flex>
{:else if table !== undefined && data !== undefined}
	<div class="p-4 overflow-y-scroll min-h-full-minus-nav">
		<Flex justify="between" classes="w-full" align="start">
			<div>
				<h5 class="capitalize">{table.name}</h5>
				<p class="m-0 text-gray-600 text-xss">{data.length} Einträge gefunden</p>
			</div>
			{#if table.getPermissions().create === true}
				<slot name="create" />
			{/if}
		</Flex>
		<Flex classes="mt-2 mb-6 w-full">
			{#if deleteLength > 0}
				<Flex align="center">
					<p class="font-bold text-xss">
						{deleteLength}
						{deleteLength === 1 ? 'ausgewählter Eintrag' : 'ausgewählte Einträge'}
					</p>
					<Button color="bg-cmsErrorRed ml-4" buttonFunction="{deleteMultiple}">
						<Flex align="center">
							<span class="mr-2 text-white material-icons">delete</span>
							<p class="text-xss">Ausgewählte löschen</p>
						</Flex>
					</Button>
				</Flex>
			{/if}
			<slot name="config" />
		</Flex>
		<slot />
	</div>
{/if}
