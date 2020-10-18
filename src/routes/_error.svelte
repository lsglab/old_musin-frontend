<script>
	export let error;
	export let status;
</script>

<svelte:head>
	<title>{status} | {process.globals.title}</title>
</svelte:head>

<div class="w-full h-full text-center text-gray-200 bg-gray-700 center">
	<div>
		<h1>{status}</h1>
		<p>{error.message}</p>
	</div>
</div>
