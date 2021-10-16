<script>
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let component;

	function loaded() {
		dispatch('loaded', { component });
	}

	function childLoaded(e) {
		const child = e.detail.component;
		component.children.find((ele) => ele.id === child.id).loaded = true;

		if (component.children.filter((ele) => ele.loaded === true).length === component.children.length) {
			loaded();
		}
	}

	onMount(() => {
		if (component.children.length === 0) {
			loaded();
		}
	});
</script>

<svelte:component
	this="{component.component}"
	component="{component}"
	blueprint="{component.blueprint}"
	{...component.props}>
	{#each component.children as child}
		<svelte:self bind:component="{child}" on:loaded="{childLoaded}" />
	{/each}
</svelte:component>
