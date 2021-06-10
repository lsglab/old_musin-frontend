<script>
	import Button from '../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../components/both/atoms/Flex.svelte';
	import NewMedia from '../../../components/cms/organisms/newMedia.svelte';
	import TableEntries from '../../../components/cms/molecules/TableEntries.svelte';

	let table;
	let data;

	let selected;

	function newMedia() {
		selected = 'new';
	}

	function closeCard() {
		selected = undefined;
	}
</script>

<TableEntries bind:table bind:data tableName="files">
	<div slot="create">
		<Button buttonFunction="{newMedia}">
			<Flex align="center">
				<span class="mr-2 text-white material-icons">add</span>
				<p class="text-xss">Datei hochladen</p>
			</Flex>
		</Button>
	</div>
</TableEntries>
{#if selected === 'new'}
	<NewMedia table="{table}" on:close="{closeCard}" />
{/if}
