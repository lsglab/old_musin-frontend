<script>
	export let error;
	export let status;
</script>

<svelte:head>
	<title>{process.globals.title} | {status}</title>
</svelte:head>

<div>
	<h1>{status}</h1>
	<p>{error.message}</p>
</div>
