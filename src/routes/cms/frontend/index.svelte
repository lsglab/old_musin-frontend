<script>
	import { onMount, tick } from 'svelte/internal';
	import Button from '../../../components/cms/atoms/Button.svelte';
	import DirNode from '../../../components/cms/molecules/DirNode.svelte';
	import Flex from '../../../components/both/atoms/Flex.svelte';
	import Loading from '../../../components/cms/atoms/Loading.svelte';
	import Table from '../../../cms/Tables/table';
	import TopNav from '../../../components/cms/molecules/TopNav.svelte';
	import request from '../../../cms/Utils/requests';

	let fetchedFiles;
	let files;
	let selectedFile;
	let table;
	let loading;

	function sortFiles() {
		const sorted = {
			dirs: [],
			files: [],
			name: '/',
		};

		// fetchedFiles = [{ path: '/' }, { path: '/test/nice/cool' }, { path: '/sheesh' }, { path: '/test/nice' }];

		fetchedFiles.forEach((file) => {
			if (!table.getPermissions(file.id).read) return;

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

	async function fetchTable() {
		const res = await request(`${process.globals.apiUrl}/tables?table=sites`, 'get', {}, true);

		if (res.status === 200) {
			table = new Table(res.data.tables[0]);
		}
	}

	async function fetchData() {
		const res = await request(`${process.globals.apiUrl}/sites?_norelations=true`, 'get', {}, true);

		if (res.status === 200) {
			fetchedFiles = res.data.sites;
			sortFiles();
		}
	}

	async function fileChanged() {
		if (selectedFile == null) return;
		await tick();
		loading = true;

		document.getElementById('iframe').onload = () => {
			loading = false;
		};
	}

	$: fileChanged(selectedFile);

	onMount(async () => {
		await fetchTable();
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
	{#if selectedFile == null}
		<Flex classes="w-3/4 h-full" justify="center" align="center" cols="true">
			<div class="m-5 text-5xl text-gray-200 material-icons">note_add</div>
			<Button href="/cms/frontend/new">Neue Seite erstellen</Button>
		</Flex>
	{:else}
		<div class="w-3/4 h-full">
			<div style="height:8%">
				<Flex classes="w-full h-full px-3 py-2 border-gray-100 border-b-2" justify="between" align="center">
					<Flex>
						<p class="mr-4 font-bold text-xss">{selectedFile.path}{selectedFile.filename}</p>
						<Button href="/cms/frontend/{selectedFile.id}">Bearbeiten</Button>
					</Flex>
					<Button color="bg-cmsSuccessGreen" href="/cms/frontend/new">Neue Seite Erstellen</Button>
				</Flex>
			</div>
			<div class="relative" style="height:92%;">
				{#if loading}
					<div class="absolute top-0 bottom-0 left-0 right-0 bg-white">
						<Flex justify="center" align="center" classes="w-full h-full">
							<Loading />
						</Flex>
					</div>
				{/if}
				<iframe
					id="iframe"
					class="w-full h-full"
					title="{selectedFile.name}"
					src="{process.globals.apiServer}{selectedFile.url}"></iframe>
			</div>
		</div>
	{/if}
</Flex>
