<script>
	/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
	import CmsNav from '../components/cms/organisms/CmsNav.svelte';
	import Tailwind from '../components/both/atoms/Tailwind.svelte';
	import Styles from '../components/both/atoms/Styles.svelte';
	import Flex from '../components/both/atoms/Flex.svelte';

	export let segment;
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
{:else}
	<slot />
{/if}
