<script context="module">
	import DialogButton from '../../../components/cms/molecules/DialogButton.svelte';
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

	let customComponents = [];

	function setNewData() {
		return {
			id: 'new',
			path: '',
			public: false,
		};
	}

	async function prepareData(reqData) {
		if (table.getColumnPermission(data.id, 'path')) reqData.path = data.path;
		if (table.getColumnPermission(data.id, 'public')) reqData.public = data.public;

		return reqData;
	}

	function save() {
		builder.save();
	}

	function publish() {
		data.public = true;
		save();
	}

	function unpublish() {
		data.public = false;
		save();
	}

	function getError(inputName) {
		return errors[inputName] !== undefined ? errors[inputName][0] : false;
	}
</script>

<SiteBuilder
	bind:this="{builder}"
	bind:table
	bind:data
	bind:customComponents
	useBase="{true}"
	id="{id}"
	tableName="sites"
	setNewData="{setNewData}"
	chooseCustomComponents="{true}"
	prepareData="{prepareData}"
	goback="/cms/frontend"
	bind:errors>
	<div slot="buttons">
		{#if id !== 'new' && table.getColumnPermission(id, 'public')}
			{#if !data.public}
				<DialogButton
					buttonFunction="{publish}"
					color="bg-cmsSuccessGreen"
					classes="h-full w-32"
					dialogText="Sind sie sicher, dass sie die Seite veröffentlichen wollen?">
					Veröffenlichen
				</DialogButton>
			{:else}
				<DialogButton
					buttonFunction="{unpublish}"
					classes="h-full w-32"
					dialogText="Sind sie sicher, dass sie die Seite nicht mehr öffentlich machen wollen?">
					Unpublish
				</DialogButton>
			{/if}
		{/if}
	</div>
	<div slot="inputs">
		<Flex align="center">
			<p class="mr-1 font-bold text-black text-xss">lsg.musin.de</p>
			<Input
				placeholder="Pfad der Seite"
				readonly="{table.getReadOnly(id, 'path')}"
				classes="w-60"
				inputClasses="w-60 font-bold"
				bind:value="{data.path}"
				error="{getError('path', errors)}"
				type="text"
				id="path" />
		</Flex>
	</div>
</SiteBuilder>
