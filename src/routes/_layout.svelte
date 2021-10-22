<script context="module">
	import CmsNav from '../components/cms/organisms/CmsNav.svelte';
	import Export from '../components/cms/export.svelte';
	import Flex from '../components/both/atoms/Flex.svelte';
	import Styles from '../components/both/atoms/Styles.svelte';
	import Tailwind from '../components/both/atoms/Tailwind.svelte';
	import request from '../cms/Utils/requests';

	async function fetchCustomComponents(apiUrl) {
		const res = await request(`${apiUrl}/components?_norelations=true`, 'get', {}, false);

		if (res.status === 200) {
			return res.data.components;
		}
		return [];
	}

	async function fetchComponent(apiUrl, component) {
		const res = await request(`${apiUrl}/components?name=${component}`, 'get', {}, false);

		return JSON.parse(res.data.components[0].blueprint);
	}

	export async function preload(page, session) {
		const apiUrl = session.globals.apiUrl;

		const customComponents = await fetchCustomComponents(apiUrl);
		const nav = await fetchComponent(apiUrl, 'Navbar');
		const footer = await fetchComponent(apiUrl, 'Footer');

		return { customComponents, footer, nav };
	}
</script>

<script>
	export let segment;
	export let footer;
	export let nav;
	export let customComponents;
</script>

<svelte:head>
	<title>{process.globals.title}</title>
</svelte:head>

<Tailwind />
<Styles />

{#if segment === 'cms'}
	<Flex classes="w-screen h-screen">
		<CmsNav />
		<div class="w-full">
			<slot />
		</div>
	</Flex>
{:else if segment === 'new'}
	<slot />
{:else}
	<Export data="{nav}" customComponents="{customComponents}" />
	<slot />
	<Export data="{footer}" customComponents="{customComponents}" />
{/if}
