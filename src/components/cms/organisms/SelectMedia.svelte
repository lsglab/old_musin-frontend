<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from '../atoms/Button.svelte';
	import EntriesFound from '../atoms/EntriesFound.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Loading from '../atoms/Loading.svelte';
	import request from '../../../cms/Utils/requests';

	const dispatch = createEventDispatcher();

	let data;
	let card;

	export let visible = false;

	async function fetchData(params) {
		data = undefined;
		let url = `${process.globals.apiUrl}/files?_norelations=true`;

		if (params !== undefined) {
			params.forEach((ele) => {
				url = `${url}&${ele}`;
			});
		}

		const res = await request(url, 'get', {}, true);

		if (!res.error) {
			data = res.data.files;
		}
	}

	function close() {
		visible = false;
	}

	function selected(file) {
		dispatch('selected', file);
		close();
	}

	onMount(() => {
		fetchData();
	});
</script>

<style>
	.visible {
		@apply opacity-100 pointer-events-auto;
	}
</style>

<div
	bind:this="{card}"
	class="fixed duration-200 bg-white rounded-lg opacity-0 pointer-events-none shadow-equal left-10 right-10 top-10 bottom-10"
	style="z-index:100"
	class:visible>
	<div class="float-right m-2 text-2xl text-gray-500 cursor-pointer material-icons" on:click="{close}">close</div>
	<div class="p-5">
		{#if data !== undefined}
			<Flex classes="mt-1" justify="between">
				<EntriesFound classes="mb-6" tableName="Dateien" length="{data.length}" />
				<Button
					classes="h-min-content "
					buttonFunction="{() => {
						fetchData(undefined);
					}}">
					<Flex align="center" classes="text-xss">
						Nochmal laden
						<div class="ml-1 text-sm material-icons">update</div>
					</Flex>
				</Button>
			</Flex>
			<Flex classes="w-full" align="center" wrap="{true}">
				{#each data as file}
					<img
						src="{process.globals.apiServer}/{file.url}"
						alt=""
						class="w-1/5 mb-2 mr-2 cursor-pointer hover"
						on:click="{() => {
							selected(file);
						}}" />
				{/each}
			</Flex>
		{:else}
			<Flex classes="h-full w-full" justify="center" align="center">
				<Loading />
			</Flex>
		{/if}
	</div>
</div>
