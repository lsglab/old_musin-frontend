<script>
	import Button from '../atoms/Button.svelte';
	import DisplayMedia from '../molecules/displayMedia.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import FloatingCard from '../molecules/FloatingCard.svelte';

	import { createEventDispatcher } from 'svelte';
	import FileOption from '../atoms/FileOption.svelte';
	import Input from '../../both/molecules/Input.svelte';
	import sizeToString from '../../../cms/Utils/files';

	const dispatch = createEventDispatcher();

	export let file;
	export let table;

	function close() {
		dispatch('close', {});
	}

	function deleteFile() {
		dispatch('delete', file);
		close();
	}

	function save() {
		dispatch('save', file);
		close();
	}
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

<FloatingCard on:close="{close}">
	<p slot="header" class="floating-card-header">Datei Bearbeiten</p>
	<Flex>
		<DisplayMedia classes="w-1/2" src="{file.path}">
			{#if table.getPermissions(file.id).delete === true}
				<FileOption title="Löschen" optFunction="{deleteFile}" background="cmsErrorRed">delete</FileOption>
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
						<h5>Typ</h5>
						<p>{file.type.split('/')[1]}</p>
					</div>
				</Flex>
			</div>
			<div>
				<Input
					readonly="{table.getReadOnly(file.id)}"
					classes="mb-3"
					labelClasses="font-bold"
					type="text"
					id="file_name"
					bind:value="{file.name}">
					Dateiname
				</Input>
				<Input
					readonly="{table.getReadOnly(file.id)}"
					labelClasses="font-bold"
					type="text"
					id="desc"
					bind:value="{file.description}">
					Beschreibung
				</Input>
			</div>
		</div>
	</Flex>
	<div slot="footer">
		<Flex classes="w-full" justify="between">
			<Button color="bg-gray-400" buttonFunction="{close}">Abbrechen</Button>
			<Button color="bg-cmsSuccessGreen" buttonFunction="{save}">Speichern</Button>
		</Flex>
	</div>
</FloatingCard>
