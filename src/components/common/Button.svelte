<script>
	// the text of the button
	export let buttonText;
	// function that should run once the button is clicked
	export let buttonFunction = () => {};
	// custom styles the user wants to apply to the button
	export let classes = '';
	// Is the button is a link?
	export let link = false;
	// If it is, the href is needed
	export let href = '';
</script>

<style lang="scss">
	button {
		max-width: 300px;
		background-color: #07f;
	}

	button,
	a {
		@apply text-white;
		@apply text-xs;
	}
</style>

<!--
	@component
	Provides a button, that either acts as a link or takes a custom function
-->

<button class="{classes} py-1 px-4 rounded-lg" on:click="{() => buttonFunction}">
	{#if link}<a class="w-full h-full" href="{href}">{buttonText}</a>{:else}{buttonText}{/if}
</button>
