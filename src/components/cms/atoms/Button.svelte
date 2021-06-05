<script>
	import { onMount } from 'svelte';

	// function that should run once the button is clicked
	export let buttonFunction = () => {};
	// custom styles the user wants to apply to the button
	export let classes = '';
	// Is the button is a link?
	export let href = false;
	// type of the button
	export let type = '';
	// which form does the button belong to
	export let form = '';
	// color
	export let color = 'bg-cmsBtnColor';
	// is the button disabled
	export let disabled = false;

	// the button
	let button;
	let domLoaded = false;

	function configAction() {
		if (!domLoaded) return;
		button.disabled = disabled;
	}

	$: configAction(disabled);

	onMount(() => {
		domLoaded = true;
		configAction();
	});
</script>

<style lang="scss">
	button,
	a {
		@apply text-white;
		@apply text-xss;
	}

	.disabled {
		@apply bg-gray-300 cursor-default pointer-events-none text-gray-500;
	}
</style>

<!--
	@component
	Provides a button, that either acts as a link or takes a custom function
-->

<button bind:this="{button}" class:disabled class="{classes} px-2 rounded-sm border-none cursor-pointer {color}" on:click="{buttonFunction}" type="{type}" form="{form}">
	{#if href !== false}
		<a class="w-full h-full" href="{href}"><slot/></a>
	{:else}
		<slot/>
	{/if}
</button>
