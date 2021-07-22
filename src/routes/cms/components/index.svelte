<script>
	import Button from '../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../components/both/atoms/Flex.svelte';
	import TableEntries from '../../../components/cms/molecules/TableEntries.svelte';

	let table;
	let components;
</script>

<TableEntries bind:table bind:data="{components}" tableName="components">
	<div slot="create">
		<Button href="/cms/components/new">
			<Flex align="center">
				<span class="mr-2 text-white material-icons">add</span>
				<p class="text-xss">{table.name} hinzufügen</p>
			</Flex>
		</Button>
	</div>
</TableEntries>
