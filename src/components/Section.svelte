<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** Center content */
	export let center = false;
</script>

<!--
	@component
	A full-width section
-->
<section class="{fullscreen ? 'fullscreen' : 'w-full'} {center ? 'center' : ''} {classes}">
	<slot />
</section>
