<script context="module">
	import { difference } from '../../../../cms/Utils/object';
	import { getTimeDifference } from '../../../../cms/Utils/time';
	import { onMount } from 'svelte';
	import AddRole from '../../../../components/cms/organisms/AddRole.svelte';
	import Button from '../../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../../components/both/atoms/Flex.svelte';
	import Input from '../../../../components/both/molecules/Input.svelte';
	import Loading from '../../../../components/cms/atoms/Loading.svelte';
	import Table from '../../../../cms/Tables/table';
	import TopNav from '../../../../components/cms/molecules/TopNav.svelte';
	import _ from 'lodash';
	import request from '../../../../cms/Utils/requests';

	export async function preload({ params, path }, { globals }) {
		const id = params.slug;
		const split = path.split('/');
		const table = split[split.length - 2];

		const response = await request(`${globals.apiUrl}/${table}`, 'get', {}, false);

		if (response.status === 404) {
			// eslint-disable-next-line babel/no-invalid-this
			this.error(response.status, response.data.response.statusText);
		}

		return { id, tableName: table };
	}
</script>

<script>
	/* eslint-disable no-param-reassign */
	export let tableName;
	export let id;
	let res;
	let oldData;
	let data;
	let table;
	let columns;
	let save = false;

	let relations = [];

	let errors = {};
	let domLoaded = false;

	function setData(fetchedData) {
		table.getNoDefaults(table.getTableColumns(table.getFillable(table.columns))).forEach((ele) => {
			if (fetchedData[ele.name] === undefined) {
				fetchedData[ele.name] = null;
			}
		});

		table.getNoDefaults(table.relations).forEach((ele) => {
			if (fetchedData[ele.functionName] === undefined) {
				fetchedData[ele.functionName] = [];
			}
		});

		data = fetchedData;
		oldData = JSON.parse(JSON.stringify(data));
	}

	async function fetchData() {
		let fetchedData = {};

		if (id !== 'new') {
			res = await request(`${process.globals.apiUrl}/${tableName}?id=${id}`, 'get', {}, true);

			if (!res.error) {
				fetchedData = res.data[tableName][0];
			} else {
				return;
			}
		}

		setData(fetchedData);
	}

	async function fetchRelation(relation) {
		res = await request(`${process.globals.apiUrl}/tables?table=${relation}`, 'get', {}, true);

		let foreign;

		if (res.status === 200) {
			if (res.data.tables.length > 0) {
				foreign = new Table(res.data.tables[0]);
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}

		res = await request(`${process.globals.apiUrl}/${foreign.table}?_norelations=true`, 'get', {}, true);

		if (!res.error) {
			return { data: res.data[foreign.table], table: foreign };
		}
		return undefined;
	}

	async function getRelations() {
		const filter = table.getNoDefaults(table.getTableColumns(table.relations));

		for (let i = filter.length - 1; i > -1; i -= 1) {
			// eslint-disable-next-line no-await-in-loop
			const response = await fetchRelation([filter[i].foreignTable]);

			if (response !== undefined) {
				filter[i].data = response.data;
				filter[i].table = response.table;
			} else {
				filter.splice(i, 1);
			}
		}

		relations = filter;
	}

	async function fetchTable() {
		res = await request(`${process.globals.apiUrl}/tables?table=${tableName}`, 'get', {}, true);

		if (!res.error) {
			table = new Table(res.data.tables[0]);
			columns = table.getFillable(table.getNoDefaults(table.columns));

			getRelations();
		}
	}

	async function tableChanged() {
		if (domLoaded === false) {
			return;
		}
		res = undefined;
		table = undefined;
		data = undefined;
		await fetchTable();
		fetchData();
	}

	async function idChanged() {
		if (domLoaded === false) return;
		res = undefined;
		data = undefined;
		fetchData();
	}

	function dataChanged() {
		if (data === undefined || oldData === undefined) return;
		if (!_.isEqual(data, oldData)) {
			// console.log('data', JSON.parse(JSON.stringify(data)));
			// console.log('oldData', JSON.parse(JSON.stringify(oldData)));
			save = true;
		} else {
			save = false;
		}
	}

	async function deleteOne() {
		res = await request(`${process.globals.apiUrl}/${tableName}?id=${id}&_norelations=true`, 'delete', {}, true);
		if (res.error !== true) {
			window.history.go(-1);
		}
	}

	$: dataChanged(data);
	$: tableChanged(tableName);
	$: idChanged(id);

	onMount(async () => {
		domLoaded = true;
		await tableChanged();
	});

	function getOptions(relation) {
		const displayValue = relation.table.getDisplayValue();
		const mapped = relation.data.map((ele) => {
			return {
				name: ele[displayValue],
				value: ele.id,
			};
		});
		return mapped;
	}

	async function savePermissionType(permissions, url, newRole) {
		if (id === 'new') {
			data[permissions].forEach((ele) => {
				ele.role_id = newRole.id;
			});
		}

		let deleteP = _.differenceWith(oldData[permissions], data[permissions], _.isEqual);
		const createP = _.differenceWith(data[permissions], oldData[permissions], _.isEqual);

		if (deleteP.length > 0) {
			deleteP = deleteP.map((ele) => ele.id);
			await request(url, 'delete', { ids: deleteP }, true);
		}
		if (createP.length > 0) {
			await request(url, 'post', createP, true);
		}
	}

	function savePermissions(newRole) {
		if (table.table !== 'roles') return;

		savePermissionType('permissions', `${process.globals.apiUrl}/permissions?_norelations=true`, newRole);
		savePermissionType(
			'column_permissions',
			`${process.globals.apiUrl}/column_permissions?_norelations=true`,
			newRole
		);
	}

	async function saveEntry() {
		if (!table.getPermissions().edit) {
			return;
		}

		data = table.modifyData(data);
		const body = difference(data, oldData);

		savePermissions();
		res = await request(`${process.globals.apiUrl}/${tableName}?id=${id}`, 'put', body, true);

		if (res.status === 200) {
			const newData = res.data[tableName][0];
			setData(newData);
			errors = [];
		} else if (res.status === 400) {
			errors = res.data;
		}
	}

	async function createEntry() {
		if (!table.getPermissions().create) {
			return;
		}
		data = table.modifyData(data);

		res = await request(`${process.globals.apiUrl}/${tableName}`, 'post', data, true);

		if (res.status === 200) {
			const newData = res.data[tableName][0];
			savePermissions(newData);
			setData(newData);
			errors = [];
			window.history.go(-1);
		}
		if (res.status === 400) {
			errors = res.data;
		}
	}

	function makeEnumOptions(enumeration) {
		if (enumeration === undefined) return [];
		const array = enumeration.map((ele) => {
			return {
				name: ele,
				value: ele,
			};
		});
		return array;
	}
</script>

<style lang="scss">
	.side-card {
		@apply shadow-equal-sm w-full p-2;

		& > h5 {
			@apply text-xss text-black font-bold;
		}
	}
</style>

<TopNav>
	<a href="/cms/database/{tableName}">
		<span class="text-xl text-gray-800 material-icons"> navigate_before </span>
	</a>
</TopNav>{#if res === undefined}
	<Flex classes="w-full full-minus-nav" justify="center" align="center">
		<Loading />
	</Flex>
{:else if table !== undefined && data !== undefined}
	<div class="p-4 overflow-y-scroll min-h-full-minus-nav">
		<Flex classes="w-full mb-6" align="center" justify="between">
			<h5>{data[table.getDisplayValue()]}</h5>
			{#if table.getPermissions().create && id === 'new'}
				<Button color="bg-cmsSuccessGreen" buttonFunction="{createEntry}">Erstellen</Button>
			{/if}
			{#if table.getPermissions().edit && id !== 'new'}
				<Button buttonFunction="{saveEntry}" disabled="{!save}">Speichern</Button>
			{/if}
		</Flex>
		<Flex align="start">
			<Flex classes="w-3/4" cols="true">
				<Flex classes="w-full mb-4 p-2 shadow-equal-sm h-auto" wrap="true">
					{#each columns as column}
						<div class="m-2 w-80">
							<Input
								id="{table}-{id}-{column.name}"
								type="{column.inputType}"
								labelClasses="text-black font-bold capitalize"
								inputClasses=" {column.type === 'radio' ? 'w-10 h-5' : ''}"
								autocomplete="{column.autocomplete}"
								readonly="{table.getReadOnly(id, column.name)}"
								required="{column.required}"
								options="{makeEnumOptions(column.enum)}"
								error="{errors[column.name] !== undefined ? errors[column.name][0] : false}"
								bind:value="{data[column.name]}">
								{column.name}
							</Input>
						</div>
					{/each}
				</Flex>
				{#if tableName === 'roles'}
					<AddRole id="{id}" bind:role="{data}" roleTable="{table}" bind:oldData />
				{/if}
			</Flex>
			<Flex classes="ml-4 w-1/4" cols="true">
				{#if id !== 'new'}
					<div class="mb-4 side-card">
						<h5>Informationen</h5>
						<Flex classes="w-full" justify="between">
							<p class="font-bold text-gray-500 text-xss">Letztes Update</p>
							<p class="font-bold text-xss">{getTimeDifference(data.updated_at)}</p>
						</Flex>
						{#if data.created_by !== undefined}
							<Flex classes="w-full" justify="between">
								<p class="font-bold text-gray-500 text-xss">Erstellt von:</p>
								<p class="font-bold text-xss">{data.created_by.name}</p>
							</Flex>
						{/if}
					</div>
				{/if}
				{#each relations as relation}
					{#if data[relation.name] !== [] && relation.data !== undefined}
						<div class="mb-4 side-card">
							<h5 class="capitalize">{relation.functionName}</h5>
							<Input
								bind:value="{data[relation.name]}"
								class="w-full"
								readonly="{table.getReadOnly(id, relation.name)}"
								error="{errors[relation.name] !== undefined ? errors[relation.name][0] : false}"
								type="enum"
								options="{getOptions(relation)}" />
						</div>
					{/if}
				{/each}
				{#if table.getPermissions().delete && id !== 'new'}
					<Button buttonFunction="{deleteOne}" classes="w-full shadow-equal-sm" color="bg-cmsErrorRed">
						<Flex align="center">
							<span class="mr-2 material-icons">delete</span>
							<p class="text-xss">Diesen Eintrag löschen</p>
						</Flex>
					</Button>
				{/if}
			</Flex>
		</Flex>
	</div>
{/if}
