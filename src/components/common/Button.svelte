<script>
	// the text of the button
	export let buttonText;
	// function that should run once the button is clicked
	export let buttonFunction = () => {};
	// custom styles the user wants to apply to the button
	export let classes = '';
</script>

<style lang="scss">
	button {
		max-width: 300px;
		background-color: #07f;
	}
</style>

<button
	class="{classes} py-1 px-4 text-white rounded-lg text-xs"
	on:click="{() => buttonFunction}">{buttonText}</button>
