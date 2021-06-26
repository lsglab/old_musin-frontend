<script>
	import { onMount } from 'svelte/internal';
	import Button from '../../../components/cms/atoms/Button.svelte';
	import DirNode from '../../../components/cms/molecules/DirNode.svelte';
	import Flex from '../../../components/both/atoms/Flex.svelte';
	import Loading from '../../../components/cms/atoms/Loading.svelte';
	import TopNav from '../../../components/cms/molecules/TopNav.svelte';
	import request from '../../../cms/Utils/requests';

	let fetchedFiles;
	let files;
	let selectedFile;

	function sortFiles() {
		const sorted = {
			dirs: [],
			files: [],
			name: '/',
		};

		// fetchedFiles = [{ path: '/' }, { path: '/test/nice/cool' }, { path: '/sheesh' }, { path: '/test/nice' }];

		fetchedFiles.forEach((file) => {
			const path = file.path.split('/');
			path.shift();
			let current = sorted;
			path.forEach((folder) => {
				if (folder === '') return;
				const exists = current.dirs.find((dir) => dir.name === folder);
				if (exists === undefined) {
					const length = current.dirs.push({
						dirs: [],
						files: [],
						name: folder,
					});

					current = current.dirs[length - 1];
					return;
				}
				current = exists;
			});
			current.files.push(file);
		});

		files = sorted;
	}

	async function fetchData() {
		const res = await request(`${process.globals.apiUrl}/sites?_norelations=true`, 'get', {}, true);

		if (res.status === 200) {
			fetchedFiles = res.data.sites;
			sortFiles();
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<TopNav />

<Flex classes="w-full full-minus-nav">
	<div class="w-1/4 border-r-2 border-gray-100">
		{#if files === undefined}
			<Flex classes="w-full h-full" justify="center" align="center">
				<Loading />
			</Flex>
		{:else}
			<DirNode bind:selectedFile dir="{files}" first="{true}" />
		{/if}
	</div>
	{#if selectedFile === undefined}
		<Flex classes="w-3/4 h-full" justify="center" align="center" cols="true">
			<div class="m-5 text-5xl text-gray-200 material-icons">note_add</div>
			<Button href="/cms/frontend/new">Neue Seite erstellen</Button>
		</Flex>
	{:else}
		<iframe
			class="w-3/4 full-minus-nav"
			title="{selectedFile.name}"
			src="{process.globals.apiServer}/{selectedFile.url}"></iframe>
	{/if}
</Flex>
