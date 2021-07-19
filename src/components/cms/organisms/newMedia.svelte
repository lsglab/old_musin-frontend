<script>
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-self-assign */
	import Button from '../atoms/Button.svelte';
	import Dialog from '../atoms/Dialog.svelte';
	import DisplayMedia from '../molecules/displayMedia.svelte';
	import Flex from '../../both/atoms/Flex.svelte';

	import { createEventDispatcher } from 'svelte';
	import EditMedia from './editMedia.svelte';
	import FileOption from '../atoms/FileOption.svelte';
	import Loading from '../atoms/Loading.svelte';
	import request from '../../../cms/Utils/requests';

	const dispatch = createEventDispatcher();

	export let table;

	let input;
	let files = [];
	let selecting = true;
	let selectedFile;
	let error = false;

	function close() {
		dispatch('close', {});
	}

	function closeSelectCard() {
		if (files.length === 0) {
			close();
		} else {
			selecting = false;
		}
	}

	async function closeDisplayCard() {
		close();
	}

	function selectFile() {
		// simulate that the user clicked on the fileupload input
		input.click();
	}

	async function fileSelected() {
		const inputFile = input.files[input.files.length - 1];
		const file = {
			created_at: new Date(),
			description: '',
			error: false,
			file: inputFile,
			id: 'new',
			local: true,
			name: inputFile.name,
			public: true,
			size: inputFile.size,
			type: inputFile.type,
			uploaded: false,
			uploading: false,
			url: URL.createObjectURL(input.files[input.files.length - 1]),
		};

		files.push(file);
		selecting = false;
	}

	function deleteFile(file) {
		const index = files.indexOf(file);
		files.splice(index, 1);
		files = files;
	}

	function editFile(file) {
		selectedFile = file;
	}

	function fileEdited() {
		selectedFile = undefined;
	}

	function getAcceptedTypes() {
		const list = table.columns.find((ele) => ele.name === 'type').enum;

		return list.join(',');
	}

	async function uploadFile(file) {
		const formData = new FormData();
		formData.set('description', file.description);
		formData.set('name', file.name);
		formData.set('type', file.type);
		formData.set('public', file.public);
		formData.set('file', file.file);

		file.uploading = true;
		files = files;

		const res = await request(`${process.globals.apiUrl}/files`, 'post', formData, true);

		if (res.status === 400) {
			file.error = res.data[Object.keys(res.data)[0]][0];
			error = true;
		} else if (res.status === 200) {
			file.uploaded = true;
			const index = files.indexOf(file);
			files.splice(index, 1);
			file.error = false;
		}

		file.uploading = false;
		files = files;
	}

	async function uploadFiles() {
		error = false;
		files.forEach((file) => {
			uploadFile(file);
		});
	}

	function checkFiles() {
		if (files.filter((ele) => ele.uploaded === true).length === files.length) {
			dispatch('uploaded', {});
			close();
		}
	}

	$: checkFiles(files);
</script>

<style lang="scss">
	.floating-card-header {
		@apply text-xs font-bold;
	}

	.overlay-icon {
		@apply w-12 h-12 text-4xl text-center bg-white bg-opacity-60 rounded-full;
		line-height: 3rem;
	}

	.img-status-text {
		@apply text-xss font-bold -mt-1 leading-4;
	}
</style>

<input
	bind:this="{input}"
	on:change="{fileSelected}"
	name="file"
	type="file"
	accept="{getAcceptedTypes()}"
	id="fileupload"
	class="hidden"
	multiple />
{#if selecting === true}
	<Dialog on:close="{closeSelectCard}">
		<p slot="header" class="floating-card-header">Datei hinzufügen</p>
		<div class="py-5 my-4 border-2 border-gray-100 border-dashed rounded-md bg-gray-50">
			<Flex classes="w-full" align="center" justify="center" cols="true">
				<div class="mb-2 text-2xl text-gray-300 material-icons">cloud_upload</div>
				<!--Drag and drop will be implemented later on. Not super important right now-->
				<!-- <p class="mb-2 text-xss"><strong style="font-size: inherit;">Drag & Drop</strong> oder</p> -->
				<Button buttonFunction="{selectFile}">Datei hochladen</Button>
			</Flex>
		</div>
		<div slot="footer">
			<Button color="bg-gray-400" buttonFunction="{closeSelectCard}">Abbrechen</Button>
		</div>
	</Dialog>
{:else if selectedFile !== undefined}
	<EditMedia
		table="{table}"
		on:delete="{() => {
			deleteFile(selectedFile);
		}}"
		bind:file="{selectedFile}"
		on:close="{fileEdited}" />
{:else}
	<Dialog on:close="{closeDisplayCard}">
		<p slot="header" class="floating-card-header">Dateien hochladen</p>
		<Button
			buttonFunction="{() => {
				selecting = true;
			}}"
			classes="float-right mb-2">
			Zusätzliche Datei hochladen
		</Button>
		<Flex classes="w-full my-4" wrap="{true}">
			{#each files as file}
				<DisplayMedia src="{file.url}" classes="w-1/4 mt-2 mr-2">
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
							editFile(file);
						}}">
						edit
					</FileOption>
					<div slot="overlay" class="absolute top-1/2 left-1/2" style="transform: translate(-50%,-50%);">
						{#if file.uploading}
							<Loading color="white" />
						{:else if file.uploaded}
							<div class="overlay-icon material-icons text-cmsSuccessGreen">done</div>
						{:else if file.error !== false}
							<div class="overlay-icon material-icons text-cmsErrorRed">cancel</div>
						{/if}
					</div>
					<div slot="status">
						{#if file.uploaded}
							<p class="img-status-text text-cmsSuccessGreen">Datei hochgeladen</p>
						{:else if file.error !== false}
							<p class="img-status-text text-cmsErrorRed">{file.error}</p>
						{/if}
					</div>
				</DisplayMedia>
			{/each}
		</Flex>
		<div slot="footer">
			<Flex classes="w-full" justify="between">
				<Button color="bg-gray-400" buttonFunction="{close}">Abbrechen</Button>
				<Button color="bg-cmsSuccessGreen" buttonFunction="{uploadFiles}" disabled="{files.length === 0}">
					{#if error}
						Nochmal Versuchen
					{:else}{files.length} {files.length === 1 ? 'Datei' : 'Dateien'} hochladen{/if}
				</Button>
			</Flex>
		</div>
	</Dialog>
{/if}
