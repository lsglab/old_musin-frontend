<script context="module">
	import CmsNav from '../components/cms/organisms/CmsNav.svelte';
	import CmsStyles from '../components/cms/atoms/Styles.svelte';
	import CmsTailwind from '../components/cms/atoms/Tailwind.svelte';
	import Export from '../components/cms/export.svelte';
	import Flex from '../components/cms/atoms/Flex.svelte';
	import FrontendStyles from '../components/frontend/atoms/Styles.svelte';
	import FrontendTailwind from '../components/frontend/atoms/Tailwind.svelte';
	import request from '../Utils/requests';

	async function fetchCustomComponents(apiUrl) {
		const res = await request(`${apiUrl}/components?_norelations=true`, 'get', {}, false);

		if (res.status === 200) {
			return res.data.components;
		}
		return false;
	}

	async function fetchComponent(apiUrl, component) {
		const res = await request(`${apiUrl}/components?name=${component}`, 'get', {}, false);

		if (res.status === 200) {
			return JSON.parse(res.data.components[0].blueprint);
		}

		return false;
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

{#if segment === 'cms'}
	<CmsStyles />
	<CmsTailwind />
	<Flex classes="w-screen h-screen">
		<CmsNav />
		<div class="w-full">
			<slot />
		</div>
	</Flex>
{:else if segment === 'new'}
	<FrontendStyles />
	<FrontendTailwind />
	<slot />
{:else}
	<FrontendStyles />
	<FrontendTailwind />
	{#if !!nav}
		<Export data="{nav}" customComponents="{customComponents}" />
	{/if}
	<slot />
	{#if !!footer}
		<Export data="{footer}" customComponents="{customComponents}" />
	{/if}
{/if}
