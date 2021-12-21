<script>
	import Button from '../../../components/cms/atoms/Button.svelte';
	import Flex from '../../../components/cms/atoms/Flex.svelte';
	import TableEntries from '../../../components/cms/molecules/TableEntries.svelte';
	import request from '../../../Utils/requests';

	let table;
	let components;

	let customComponents;

	let triggerDataReload;

	async function fetchCustomComponents() {
		const res = await request(`${process.globals.apiUrl}/components?_norelations=true`, 'get', {}, true);

		if (res.status === 200) {
			customComponents = res.data.components;
		}
	}

	function fetched() {
		components.forEach((component) => {
			window.document.addEventListener(
				'blueprint_iframe_mounted',
				() => {
					const blueprint = JSON.parse(component.blueprint);

					const event = new CustomEvent('create_blueprint', { detail: { blueprint, customComponents } });
					document.getElementById(component.name).contentDocument.dispatchEvent(event);
				},
				false
			);
		});
	}
</script>

<style lang="scss">
	.iframe-container {
		padding-top: 56.25%;
	}
</style>

<TableEntries
	bind:table
	bind:triggerDataReload
	bind:data="{components}"
	additionalRequests="{fetchCustomComponents}"
	tableName="components"
	on:fetched="{fetched}">
	<div slot="create">
		<Button href="/cms/components/new">
			<Flex align="center">
				<span class="mr-2 text-white material-icons">add</span>
				<p class="text-xss">{table.name} hinzufügen</p>
			</Flex>
		</Button>
	</div>
	<div>
		{#if customComponents !== undefined}
			<div class="grid grid-cols-3 gap-6">
				{#each components as component}
					<a
						alt=""
						href="/cms/components/{component.id}"
						class="rounded-md cursor-pointer shadow-cms-equal-xl hover:shadow-cms-equal-sm">
						<div class="relative overflow-hidden iframe-container">
							<iframe
								id="{component.name}"
								title="{component.name}"
								src="/new?blueprint={true}"
								class="absolute top-0 left-0 w-full h-full"></iframe>
						</div>
						<div class="p-2">
							<p class="font-bold text-black">{component.name}</p>
							<p class="text-gray-600 text-xss">{component.description}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</TableEntries>
