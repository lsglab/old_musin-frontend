<script>
	/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
	import Tailwind from '../components/Tailwind.svelte';
	import Styles from '../components/Styles.svelte';
	import Footer from '../components/Footer.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<svelte:head>
	<title>{process.globals.title}</title>
</svelte:head>

<Tailwind />
<Styles />
<Nav />
<slot />
<Footer />
