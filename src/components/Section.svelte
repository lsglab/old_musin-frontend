<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** ID of the section */
	export let id = '';
</script>

<!--
	@component
	A full-width section
-->
<section class="w-full {fullscreen ? 'h-full' : ''} {classes}" id="{id}">
	<slot />
</section>
