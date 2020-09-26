<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** ID of the section */
	export let id;
</script>

<!--
	@component
	A full-width section
-->
<section class="{fullscreen ? 'fullscreen' : 'w-full'} {classes}" id="{id}">
	<slot />
</section>
