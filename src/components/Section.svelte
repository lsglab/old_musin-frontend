<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** Center content */
	export let center = false;
	// custom padding, e.g 10%
	export let padding = '';
	/** ID of the section */
	export let id;
</script>

<!--
	@component
	A full-width section
-->
<section
	class="{fullscreen ? 'fullscreen' : 'w-full'} {center ? 'center' : ''} {classes}"
	id="{id}"
	style="padding: {padding}">
	<slot />
</section>
