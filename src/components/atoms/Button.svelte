<script>
	// the text of the button
	export let buttonText;
	// function that should run once the button is clicked
	export let buttonFunction = () => {};
	// custom styles the user wants to apply to the button
	export let classes = '';
	// Is the button is a link?
	export let href = false;
</script>

<style lang="scss">
	button {
		padding-top: 0.32rem;
		padding-bottom: 0.32rem;
	}

	button,
	a {
		@apply text-white;
		@apply lg:text-xs;
	}
</style>

<!--
	@component
	Provides a button, that either acts as a link or takes a custom function
-->

<button class="{classes} px-4 rounded-md border-none cursor-pointer bg-btnBlue" on:click="{buttonFunction}">
	{#if href !== false}
		<a class="w-full h-full" href="{href}">{buttonText}</a>
	{:else}
		{buttonText}
	{/if}
</button>
