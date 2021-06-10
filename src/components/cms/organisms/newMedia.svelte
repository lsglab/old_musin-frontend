<script>
	import Button from '../atoms/Button.svelte';
	import DisplayMedia from '../molecules/displayMedia.svelte';
	import File from '../../../cms/DataTypes/File';
	import Flex from '../../both/atoms/Flex.svelte';
	import FloatingCard from '../molecules/FloatingCard.svelte';

	import { createEventDispatcher } from 'svelte';
	import EditMedia from './editMedia.svelte';
	import FileOption from '../atoms/FileOption.svelte';
	import request from '../../../cms/Utils/requests';

	const dispatch = createEventDispatcher();

	export let table;

	let input;
	let files = [];
	let selecting = true;
	let selectedFile;

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
		const file = new File({
			caption: '',
			created_at: new Date(),
			description: '',
			id: 'new',
			name: input.files[input.files.length - 1].name,
			path: URL.createObjectURL(input.files[input.files.length - 1]),
			size: input.files[input.files.length - 1].size,
			type: input.files[input.files.length - 1].type,
		});
		files.push(file);
		selecting = false;
	}

	function deleteFile(file) {
		const index = files.indexOf(file);
		files.splice(index, 1);
		input.files.splice(index, 1);
		files = files;
	}

	function editFile(file) {
		selectedFile = file;
	}

	function fileEdited() {
		selectedFile = undefined;
	}

	async function uploadFiles() {
		const form = document.getElementById('upload-form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		await request(`${process.globals.baseUrl}/files`, 'post', new FormData(form), true);
	}
</script>

<style lang="scss">
	.floating-card-header {
		@apply text-xs font-bold;
	}
</style>

<form id="upload-form" class="hidden" method="post" action="{`${process.globals.baseURL}/files`}">
	<input
		bind:this="{input}"
		on:change="{fileSelected}"
		name="files[]"
		type="file"
		id="fileupload"
		class="hidden"
		multiple />
</form>
{#if selecting === true}
	<FloatingCard on:close="{closeSelectCard}">
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
	</FloatingCard>
{:else if selectedFile !== undefined}
	<EditMedia
		table="{table}"
		on:delete="{() => {
			deleteFile(selectedFile);
		}}"
		bind:file="{selectedFile}"
		on:close="{fileEdited}" />
{:else}
	<FloatingCard on:close="{closeDisplayCard}">
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
				<DisplayMedia src="{file.path}" classes="w-1/4 mt-2 mr-2">
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
				</DisplayMedia>
			{/each}
		</Flex>
		<div slot="footer">
			<Flex classes="w-full" justify="between">
				<Button color="bg-gray-400" buttonFunction="{close}">Abbrechen</Button>
				<Button color="bg-cmsSuccessGreen" buttonFunction="{uploadFiles}" disabled="{files.length === 0}">
					{files.length}
					{files.length === 1 ? 'Datei' : 'Dateien'}
					hochladen
				</Button>
			</Flex>
		</div>
	</FloatingCard>
{/if}
