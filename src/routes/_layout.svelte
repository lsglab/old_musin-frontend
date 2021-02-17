<script>
	/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
	import Tailwind from '../components/atoms/Tailwind.svelte';
	import Styles from '../components/atoms/Styles.svelte';
	import Footer from '../components/organisms/Footer.svelte';
</script>

<svelte:head>
	<title>{process.globals.title}</title>
</svelte:head>

<Tailwind />
<Styles />
<slot />
<Footer />
