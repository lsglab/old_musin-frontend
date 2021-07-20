<script>
	export let component;
</script>

<!--This each/else statement is as of the 7.4.2021 the onliest way to fix an error (Outros undefined)
	that occurs when deleting a component
	See: https://github.com/sveltejs/svelte/issues/3165
-->

<svelte:component component={component} blueprint={component.blueprint} this="{component.component}" {...component.props}>
	{#each component.children as child}
		<svelte:self bind:component="{child}" />
	{/each}
</svelte:component>
