<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** Center content */
	export let center = false;
	// tailwind padding
	export let padding = false;
	/** ID of the section */
	export let id;
</script>

<!--
	@component
	A full-width section
-->
<section
	class="{fullscreen ? 'fullscreen' : 'w-full'} {padding ? 'lg:px-32 md:px-20 px-8' : ""} {center ? 'center' : ''} {classes}"
	id="{id}">
	<slot />
</section>
