<script context="module">
	import Button from '../../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../../components/both/atoms/Flex.svelte';
	import Input from '../../../../components/cms/inputs/Input.svelte';
	import TableEntries from '../../../../components/cms/molecules/TableEntries.svelte';
	import request from '../../../../cms/Utils/requests';

	export async function preload({ params }, { globals }) {
		const slug = params.slug;

		const response = await request(`${globals.apiUrl}/${slug}`, 'get', {}, false);

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

	let triggerReload = false;
	// the values to be displayed
	let displayValues = [];
	// the values that can be displayed
	let visible = false;
	// default
	let deleteAll = false;
	// the settings card
	let settingsCard;

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

	async function deleteOne(id) {
		await request(`${process.globals.apiUrl}/${slug}?id=${id}`, 'delete', {}, true);
		// trigger a reload in the TableEntries component
		triggerReload = true;
	}

	function toggleVisible() {
		visible = true;
	}

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

<TableEntries
	bind:triggerReload
	deleteAll="{deleteAll}"
	tableName="{slug}"
	bind:table
	bind:data
	on:fetched="{getAttributes}">
	<div slot="create">
		<Button href="/cms/database/{slug}/new">
			<Flex align="center">
				<span class="mr-2 text-white material-icons">add</span>
				<p class="text-xss">{table.name} hinzufügen</p>
			</Flex>
		</Button>
	</div>
	<div slot="config" class="ml-auto">
		<Flex classes="ml-auto w-min cursor-pointer relative" align="center">
			<span on:click="{toggleVisible}" class="text-lg material-icons"> settings </span>
			<div
				bind:this="{settingsCard}"
				class="absolute right-0 p-2 bg-white opacity-0 pointer-events-none shadow-cms-equal-sm w-max top-6"
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
	</div>
	<table class="w-full mb-10 shadow-cms-equal-sm">
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
</TableEntries>

<svelte:window on:mousedown="{mouseclick}" />
