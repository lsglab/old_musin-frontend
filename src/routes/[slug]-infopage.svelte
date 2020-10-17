<script>
	import Carddeck from '../components/Carddeck.svelte';
	import Nav from '../components/Nav.svelte';

	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Nav />

<Carddeck title="Infoseite {title} | {process.globals.title}" />
