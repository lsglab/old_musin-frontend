<script>
	/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
	import Tailwind from '../components/Tailwind.svelte';
	import Styles from '../components/Styles.svelte';
	import Footer from '../components/Footer.svelte';
	import OldNav from '../components/oldNav.svelte';
	import ReferenceNav from '../components/referenceNav.svelte';
</script>

<svelte:head>
	<title>{process.globals.title}</title>
</svelte:head>

<Tailwind />
<Styles />
<ReferenceNav />
<OldNav />
<slot />
<Footer />
