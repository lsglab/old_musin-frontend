<script>
	import { errorRequest } from '../../../Utils/requests';
	import Button from '../../../components/cms/atoms/Button.svelte';
	import DisplayMedia from '../../../components/cms/molecules/displayMedia.svelte';
	import EditMedia from '../../../components/cms/organisms/editMedia.svelte';
	import FileOption from '../../../components/cms/atoms/FileOption.svelte';
	import Flex from '../../../components/cms/atoms/Flex.svelte';
	import Input from '../../../components/cms/inputs/BasicInput.svelte';
	import NewMedia from '../../../components/cms/organisms/newMedia.svelte';
	import TableEntries from '../../../components/cms/molecules/TableEntries.svelte';

	let table;
	let data;
	let triggerDataReload = false;
	let triggerTableReload = false;
	let deleteAll = false;

	let selected;

	function newMedia() {
		selected = 'new';
	}

	function closeCard() {
		selected = undefined;
	}

	function reloadData() {
		triggerDataReload = true;
	}

	function reloadTable() {
		triggerTableReload = true;
	}

	function reloadAll() {
		reloadData();
		reloadTable();
	}

	async function deleteFile(file) {
		await errorRequest(`${process.globals.apiUrl}/${table.table}?id=${file.id}`, 'delete', {}, true, window);
		reloadData();
	}

	function triggerEdit(file) {
		const index = data.indexOf(file);
		selected = index;
	}
</script>

<TableEntries bind:deleteAll bind:triggerDataReload bind:triggerTableReload bind:table bind:data tableName="files">
	<div slot="create">
		<Button buttonFunction="{newMedia}">
			<Flex align="center">
				<span class="mr-2 text-white material-icons">add</span>
				<p class="text-xss">Datei hochladen</p>
			</Flex>
		</Button>
	</div>
	{#if data.length > 0}
		<Input classes="my-2" type="checkbox" bind:value="{deleteAll}" id="delete-all" />
	{/if}
	<Flex classes="w-full" align="center">
		{#each data as file}
			<DisplayMedia
				justify="between"
				classes="w-1/7 mr-2 h-auto"
				type="{file.type}"
				square="{true}"
				src="{process.globals.apiServer}/{file.url}">
				<Input classes="m-0.5" type="checkbox" id="{file.name}-select" bind:value="{file.ctx_delete}" />
				<div>
					<FileOption
						title="Löschen"
						background="cmsErrorRed"
						optFunction="{() => {
							deleteFile(file);
						}}">
						delete
					</FileOption>
					<FileOption
						title="Bearbeiten"
						optFunction="{() => {
							triggerEdit(file);
						}}">
						edit
					</FileOption>
				</div>
			</DisplayMedia>
		{/each}
	</Flex>
</TableEntries>
{#if selected === 'new'}
	<NewMedia table="{table}" on:close="{closeCard}" on:uploaded="{reloadAll}" />
{:else if selected !== undefined}
	<EditMedia
		table="{table}"
		file="{data[selected]}"
		on:saved="{(event) => {
			data[selected] = event.detail;
		}}"
		on:close="{closeCard}"
		on:delete="{(event) => {
			deleteFile(event.detail);
		}}" />
{/if}
