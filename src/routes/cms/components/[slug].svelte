<script context="module">
	import Flex from '../../../components/cms/atoms/Flex.svelte';
	import Input from '../../../components/cms/inputs/Input.svelte';
	import SiteBuilder from '../../../components/cms/organisms/SiteBuilder.svelte';

	export async function preload({ params }) {
		const id = params.slug;

		return { id };
	}
</script>

<script>
	/* eslint-disable no-param-reassign */
	export let id;
	let table;
	let data;
	let errors = {};
	let builder;

	function setNewData() {
		return {
			description: '',
			id: 'new',
			name: '',
		};
	}

	function deleteCheck() {
		return data.name !== 'Footer' && data.name !== 'Navbar';
	}

	async function prepareData(reqData, component) {
		if (table.getColumnPermission(data.id, 'description')) reqData.description = data.description;
		if (table.getColumnPermission(data.id, 'name')) reqData.name = data.name;
		if (table.getColumnPermission(data.id, 'slot')) reqData.slot = component.searchForComponent('Slot') !== false;

		return reqData;
	}

	function getError(inputName) {
		return errors[inputName] !== undefined ? errors[inputName][0] : false;
	}
</script>

<SiteBuilder
	bind:this="{builder}"
	bind:table
	bind:data
	id="{id}"
	tableName="components"
	deleteCheck="{deleteCheck}"
	setNewData="{setNewData}"
	prepareData="{prepareData}"
	goback="/cms/components"
	bind:errors>
	<div slot="inputs" class="w-full">
		<Flex align="center" classes="w-full">
			<Input
				placeholder="Name des Komponenten"
				readonly="{table.getReadOnly(id, 'name')}"
				classes="w-1/4 mr-4"
				inputClasses="w-full"
				bind:value="{data.name}"
				error="{getError('name', errors)}"
				type="text"
				id="name" />
			<Input
				placeholder="Beschreibung"
				readonly="{table.getReadOnly(id, 'description')}"
				classes="w-3/4"
				inputClasses="w-full"
				bind:value="{data.description}"
				error="{getError('description', errors)}"
				type="text"
				id="name" />
		</Flex>
	</div>
</SiteBuilder>
