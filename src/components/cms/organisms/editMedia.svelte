<script>
	import { difference } from '../../../cms/Utils/object';
	import Button from '../atoms/Button.svelte';
	import Dialog from '../atoms/Dialog.svelte';
	import DisplayMedia from '../molecules/displayMedia.svelte';
	import Flex from '../../both/atoms/Flex.svelte';

	import { createEventDispatcher } from 'svelte';
	import FileOption from '../atoms/FileOption.svelte';
	import Input from '../inputs/Input.svelte';
	import _ from 'lodash';
	import request from '../../../cms/Utils/requests';
	import sizeToString from '../../../cms/Utils/files';

	const dispatch = createEventDispatcher();

	export let file;
	export let table;
	let errors = {};
	let canSave = false;
	let fileInput;

	const oldData = JSON.parse(JSON.stringify(file));
	let fileName = file.name.split('.')[0];
	const fileType = file.name.split('.')[1];

	function close() {
		dispatch('close', {});
	}

	function deleteFile() {
		dispatch('delete', file);
		close();
	}

	function downloadFile() {
		window.open(`${process.globals.apiServer}/download/${file.name}`);
	}

	function openFile() {
		window.open(`${process.globals.apiServer}/${file.url}`);
	}

	function selectFile() {
		fileInput.click();
	}

	function abort() {
		// revert all changes and close
		console.log('oldData', oldData);
		file = oldData;
		console.log('file', file);
		close();
	}

	async function saveFile() {
		const diff = difference(file, oldData);
		const data = new FormData();
		Object.keys(diff).forEach((key) => {
			data.set(key, diff[key]);
		});

		console.log('input', fileInput, 'data', data);
		if (fileInput.value !== '') {
			console.log('heloo');
			data.set(fileInput.name, fileInput.files[0]);
		}

		const res = await request(`${process.globals.apiUrl}/files?id=${file.id}&_method=PUT`, 'post', data, true);

		if (res.status === 200) {
			file = res.data[table.table][0];
			dispatch('saved', file);
			close();
		} else if (res.status === 400) {
			errors = res.data;
		}
	}

	function fileSelected() {
		const selectedFile = fileInput.files[fileInput.files.length - 1];
		file.size = selectedFile.size;
		file.type = selectedFile.type;
		file.local = true;
		file.url = URL.createObjectURL(selectedFile);
	}

	function hasError(key) {
		if (errors[key] !== undefined) {
			return errors[key][0];
		}

		return false;
	}

	function save() {
		if (file.id !== 'new') {
			saveFile();
		} else {
			close();
		}
	}

	function editName() {
		file.name = `${fileName}.${fileType}`;
		// trigger update for file
		file = file;
	}

	function dataChanged() {
		if (!_.isEqual(file, oldData)) {
			canSave = true;
		} else {
			canSave = false;
		}
	}

	$: editName(fileName);
	$: dataChanged(file);
</script>

<style lang="scss">
	.floating-card-header {
		@apply text-xs font-bold;
	}

	.info {
		> * {
			font-size: 0.6rem;
			line-height: 0.8rem;
			@apply text-gray-500;
		}
	}
</style>

<input
	bind:this="{fileInput}"
	on:change="{fileSelected}"
	name="file"
	type="file"
	accept="{file.type}"
	id="fileupload"
	class="hidden"
	multiple />
<Dialog on:close="{abort}">
	<p slot="header" class="floating-card-header">Datei Bearbeiten</p>
	<Flex>
		<DisplayMedia
			classes="w-1/2"
			src="{file.local ? file.url : `${process.globals.apiServer}/${file.url}`}"
			square="{true}">
			{#if table.getPermissions(file.id).delete === true}
				<FileOption title="Löschen" optFunction="{deleteFile}" background="cmsErrorRed">delete</FileOption>
			{/if}
			{#if file.id !== 'new'}
				<FileOption title="Datei ersetzen" optFunction="{selectFile}">upgrade</FileOption>
			{/if}
			{#if !file.local}
				<FileOption title="Herunterladen" optFunction="{downloadFile}">file_download</FileOption>
				<FileOption title="Datei in neuem Tab öffnen" optFunction="{openFile}">open_in_new</FileOption>
			{/if}
		</DisplayMedia>
		<div class="w-1/2 ml-4">
			<div class="w-full p-3 mb-4 bg-gray-100">
				<Flex justify="between" classes="mb-3">
					<div class="info">
						<h5>Größe</h5>
						<p>{sizeToString(file.size)}</p>
					</div>
					<div class="info">
						<h5>Erstellt am:</h5>
						<p>{new Date(file.created_at).toLocaleDateString()}</p>
					</div>
				</Flex>
				<Flex justify="between">
					<div class="info">
						<h5>Datei-typ</h5>
						<p>{file.type.split('/')[file.type.split('/').length - 1]}</p>
					</div>
				</Flex>
			</div>
			<div>
				<Input
					readonly="{table.getReadOnly(file.id, 'name')}"
					classes="mb-3"
					error="{hasError('name', errors)}"
					labelClasses="font-bold"
					type="text"
					id="file_name"
					bind:value="{fileName}">
					Dateiname
				</Input>
				<Input
					readonly="{table.getReadOnly(file.id, 'description')}"
					error="{hasError('description', errors)}"
					labelClasses="font-bold"
					classes="mb-3"
					type="text"
					id="desc"
					bind:value="{file.description}">
					Beschreibung
				</Input>
				<Input
					readonly="{table.getReadOnly(file.id, 'public')}"
					error="{hasError('public', errors)}"
					labelClasses="font-bold"
					inputClasses="w-8 h-4"
					type="radio"
					id="file_public"
					bind:value="{file.public}">
					Public
				</Input>
			</div>
		</div>
	</Flex>
	<div slot="footer">
		<Flex classes="w-full" justify="between">
			<Button color="bg-gray-400" buttonFunction="{abort}">Abbrechen</Button>
			<Button color="bg-cmsSuccessGreen" buttonFunction="{save}" disabled="{!canSave}">Speichern</Button>
		</Flex>
	</div>
</Dialog>
