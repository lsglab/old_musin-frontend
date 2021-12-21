<script context="module">
	import Export from '../components/cms/export.svelte';
	import request from '../Utils/requests';

	async function fetchCustomComponents(apiUrl) {
		const res = await request(`${apiUrl}/components?_norelations=true`, 'get', {}, false);

		if (res.status === 200) {
			return res.data.components;
		}
		return [];
	}

	async function fetchData(apiUrl, path) {
		const res = await request(`${apiUrl}/sites?path=${path}`, 'get', {}, false);

		return JSON.parse(res.data.sites[0].blueprint);
	}

	export async function preload(page, session) {
		const apiUrl = session.globals.apiUrl;
		let path = page.path;

		if (path === '/') {
			path = '/index';
		}

		const customComponents = await fetchCustomComponents(apiUrl);
		const data = await fetchData(apiUrl, path);

		return { customComponents, data };
	}
</script>

<script>
	export let customComponents;
	export let data;
</script>

<div style="visibility:hidden;"><a href="/termine" alt="">/termine</a></div>

<Export data="{data}" customComponents="{customComponents}" />
