<script>
	export let dir;
	export let first = false;
	export let selectedFile = null;
	let open = first;

	function toggleOpen() {
		open = !open;
	}
</script>

<style>
	.name {
		@apply ml-2 font-bold text-xss;
	}
</style>

<div class="{!first ? 'ml-3' : ''}">
	<div class="flex flex-row items-center cursor-pointer" on:click="{toggleOpen}">
		<div class="text-black material-icons">{open ? 'arrow_drop_down' : 'arrow_right'}</div>
		<div class="text-xl text-yellow-300 material-icons">{open ? 'folder_open' : 'folder'}</div>
		<p class="name">{dir.name}</p>
	</div>

	{#if open}
		{#each dir.dirs as directory}
			<svelte:self bind:selectedFile dir="{directory}" />
		{/each}
		{#each dir.files as file}
			<div
				on:click="{() => {
					selectedFile = file;
				}}"
				class="flex flex-row items-center ml-4 cursor-pointer">
				<div class="text-red-400 material-icons">description</div>
				<p class="name">{file.filename}</p>
			</div>
		{/each}
	{/if}
</div>
