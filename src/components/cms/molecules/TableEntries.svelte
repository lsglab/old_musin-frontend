<script>
	import { webrequest } from '../../../Utils/requests';
	import DialogButton from './DialogButton.svelte';
	import Flex from '../atoms/Flex.svelte';
	import Input from '../inputs/Input.svelte';
	import Loading from '../atoms/Loading.svelte';
	import Table from '../../../cms/Tables/table';
	import TopNav from './TopNav.svelte';

	import { createEventDispatcher, onMount } from 'svelte';
	import EntriesFound from '../atoms/EntriesFound.svelte';

	const dispatch = createEventDispatcher();

	let search = '';
	export let table;
	export let data;
	export let tableName;
	export let deleteAll = false;
	export let triggerDataReload = false;
	export let triggerTableReload = false;

	export let additionalRequests = async () => {};
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

		const res = await webrequest(url, 'get', {}, true, window);

		if (!res.error) {
			data = res.data[tableName];
			changeDeletes();
		}
	}

	async function fetchTable() {
		table = undefined;

		const res = await webrequest(`${process.globals.apiUrl}/tables?table=${tableName}`, 'get', {}, true, window);

		if (!res.error) {
			table = new Table(res.data.tables[0]);
		}
	}

	async function fetchAll() {
		await fetchData();
		await fetchTable();
		await additionalRequests();
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

		await webrequest(`${process.globals.apiUrl}/${tableName}`, 'delete', { ids }, true, window);
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
			<EntriesFound tableName="{table.table}" length="{data.length}" />
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
					<DialogButton
						color="bg-cmsErrorRed"
						classes="ml-4"
						buttonFunction="{deleteMultiple}"
						dialogText="Wollen sie {deleteLength} {deleteLength === 1 ? 'Eintrag' : 'Einträge'} unwiederuflich löschen?">
						<Flex align="center">
							<span class="mr-2 text-white material-icons">delete</span>
							<p class="text-xss">Ausgewählte löschen</p>
						</Flex>
					</DialogButton>
				</Flex>
			{/if}
			<slot name="config" />
		</Flex>
		<slot />
	</div>
{/if}
