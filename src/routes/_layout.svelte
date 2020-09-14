<script>
	import Tailwind from '../components/Tailwind.svelte';
	import Styles from '../components/Styles.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>{process.globals.title}</title>
</svelte:head>

<Tailwind />
<Styles />
<slot />
<Footer />
