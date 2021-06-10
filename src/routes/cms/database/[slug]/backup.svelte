<script context="module">
	import { onMount } from 'svelte';
	import Button from '../../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../../components/both/atoms/Flex.svelte';
	import Input from '../../../../components/both/molecules/Input.svelte';
	import Loading from '../../../../components/cms/atoms/Loading.svelte';
	import Table from '../../../../cms/Tables/table';
	import TopNav from '../../../../components/cms/molecules/TopNav.svelte';
	import request from '../../../../cms/Utils/requests';

	export async function preload({ params }, { globals }) {
		const slug = params.slug;

		const response = await request(`${globals.baseUrl}/${slug}`, 'get', {}, false);

		if (response.status === 404) {
			// eslint-disable-next-line babel/no-invalid-this
			this.error(404, 'Not found');
		}
		return { slug };
	}
</script>

<script>
	/* eslint-disable no-param-reassign */
	export let slug;
	let data;
	let table;
	let search = '';
	let res;
	// the values to be displayed
	let displayValues;
	// the values that can be displayed
	let visible = false;
	// default
	let deleteAll = false;
	// the settings card
	let settingsCard;
	// is the dom loaded ?
	let domLoaded = false;
	// permissions of the user for this subject

	function getAttributes() {
		displayValues = [];
		table.getVisible(table.columns).forEach((ele) => {
			if (ele.type === 'timestamp') ele.visible = false;
			else ele.visible = true;

			data.forEach((entry) => {
				entry = ele.setDisplayData(entry);
				return entry;
			});

			displayValues.push(ele);
		});
	}

	function changeDeletes() {
		if (data === undefined) return;
		data.forEach((ele, key) => {
			data[key].ctx_delete = deleteAll;
		});
	}

	async function fetchData(params) {
		let url = `${process.globals.baseUrl}/${slug}?_norelations=true`;

		if (params !== undefined) {
			params.forEach((ele) => {
				url = `${url}&${ele}`;
			});
		}

		res = undefined;
		res = await request(url, 'get', {}, true);

		if (!res.error) {
			data = res.data[slug];
			changeDeletes();
		}
	}

	async function fetchAll() {
		await fetchData();

		res = await request(`${process.globals.baseUrl}/tables?table=${slug}`, 'get', {}, true);

		if (!res.error) {
			table = new Table(res.data.tables[0]);
		}

		getAttributes();
	}

	async function searchChanged() {
		if (domLoaded === false) return;
		fetchData([`_search=${search}`]);
	}

	async function slugChanged() {
		if (domLoaded === false) return;
		res = undefined;
		table = undefined;
		data = undefined;
		fetchAll();
	}

	async function deleteMultiple() {
		const ids = data.filter((ele) => ele.ctx_delete === true).map((ele) => ele.id);

		res = await request(`${process.globals.baseUrl}/${slug}`, 'delete', { ids }, true);
		slugChanged();
	}

	async function deleteOne(id) {
		res = await request(`${process.globals.baseUrl}/${slug}?id=${id}`, 'delete', {}, true);
		slugChanged();
	}

	function toggleVisible() {
		visible = true;
	}

	$: changeDeletes(deleteAll);
	$: slugChanged(slug);
	$: searchChanged(search);
	$: deleteLength = data !== undefined ? data.filter((ele) => ele.ctx_delete === true).length : 0;

	onMount(() => {
		domLoaded = true;
		slugChanged();
	});

	function mouseclick(e) {
		if (!(e.path || e.composedPath()).includes(settingsCard)) {
			visible = false;
		}
	}
</script>

<style>
	table span {
		@apply text-xss;
	}

	th,
	td {
		@apply px-2 p-1;
	}

	.table-border {
		@apply border-t border-solid border-gray-200;
	}

	.visible {
		@apply pointer-events-auto opacity-100;
	}
</style>

<TopNav>
	<Input placeholder="Suche..." inputClasses="w-60" bind:value="{search}" id="search" type="text" />
</TopNav>

{#if res === undefined}
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
				<Button href="/cms/database/{slug}/new">
					<Flex align="center">
						<span class="mr-2 text-white material-icons">add</span>
						<p class="text-xss">{table.name} hinzufügen</p>
					</Flex>
				</Button>
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
			<Flex classes="ml-auto w-min float-right cursor-pointer relative" align="center">
				<span on:click="{toggleVisible}" class="text-lg material-icons"> settings </span>
				<div
					bind:this="{settingsCard}"
					class="absolute right-0 p-2 bg-white opacity-0 pointer-events-none shadow-equal-sm w-max top-6"
					class:visible>
					<Flex align="center" classes="mb-1">
						<p class="mr-2 text-xs font-bold">Dargestellte Felder</p>
						<p
							class="text-cmsBtnColor text-xss"
							on:click="{() => {
								getAttributes();
							}}">
							Zurücksetzen
						</p>
					</Flex>
					{#each displayValues as value}
						<Flex align="center">
							<Input
								classes="my-0.5"
								labelClasses="text-black"
								labelPos="right"
								id="display-{value.name}"
								type="checkbox"
								bind:value="{value.visible}">
								{value.name}
							</Input>
						</Flex>
					{/each}
				</div>
			</Flex>
		</Flex>
		<table class="w-full mb-10 shadow-equal-sm">
			<thead>
				<tr>
					<th class="bg-gray-100">
						{#if table.permissions.delete !== false}
							<Input type="checkbox" id="delete-all" bind:value="{deleteAll}" />
						{/if}
					</th>
					{#each displayValues as value}
						{#if value.visible === true}
							<th class="text-left bg-gray-100"><span class="capitalize">{value.name}</span></th>
						{/if}
					{/each}
					<th class="bg-gray-100"></th>
				</tr>
			</thead>
			<tbody>
				{#each data as ele, i}
					<tr class="text-black duration-75 hover:bg-gray-50">
						<td class="{i !== 0 ? 'table-border' : ''}">
							{#if table.getPermissions(ele.id).delete}
								<Input type="checkbox" id="delete-{ele.id}" bind:value="{ele.ctx_delete}" />
							{/if}
						</td>
						{#each displayValues as value}
							{#if value.visible === true}
								<a
									href="/cms/database/{table.table}/{ele.id}"
									style="display:contents;"
									class="text-black cursor-pointer">
									<td class="{i !== 0 ? 'table-border' : ''}"><span>{ele[value.name]}</span></td>
								</a>
							{/if}
						{/each}
						<td class="{i !== 0 ? 'table-border' : ''}">
							{#if table.getPermissions(ele.id).delete}
								<span
									class="cursor-pointer material-icons"
									on:click="{() => deleteOne(ele.id)}">delete</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<svelte:window on:mousedown="{mouseclick}" />
