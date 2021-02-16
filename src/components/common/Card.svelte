<script>
	import Link from './Link.svelte';

	/** Additional classes to pass in */
	export let classes = '';

	export let link = false;
</script>

<!--
    @component
    Provides a responsive multi-purpose universal card container with three sections.
-->
<style>
	.hover:hover {
		width: 102%;
		height: 102%;
	}
</style>

<div class="overflow-hidden shadow-equal rounded-md {classes}">
	{#if link}
		<div class="w-full h-full {link ? 'hover' : ''}">
			<Link href="{link}">
				<div class="w-full h-full text-black">
					<!--Card header section-->
					<slot name="header"/>
					<!--Card body section-->
					<slot name="body"/>
					<!--Card footer section-->
					<slot name="footer"/>
				</div>
			</Link>
		</div>
	{:else}
		<slot name="header" />
		<!--Card body section-->
		<slot name="body"/>
		<!--Card footer section-->
		<slot name="footer"/>
	{/if}
</div>
