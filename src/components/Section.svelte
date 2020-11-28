<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** Center content */
	export let center = false;
	// tailwind padding
	export let padding = false;
	// custom styles (f.e. 'padding: 20px')
	export let customStyles = '';
	/** ID of the section */
	export let id = '';
</script>

<style lang="scss">
	.dashedTopBorder {
		position: relative;
		&::before {
			content: '';
			width: 100%;
			height: 1px;
			position: absolute;
			top: -20px;
			left: 0;
			background: linear-gradient(
				90deg,
				rgba(66, 71, 112, 0.09),
				rgba(66, 71, 112, 0.09) 50%,
				transparent 0,
				transparent
			);
			background-size: 8px 1px;
		}
	}
</style>

<!--
	@component
	A full-width section
-->
<section
	class="{fullscreen ? 'fullscreen' : 'w-full'} {padding ? 'lg:px-32 md:px-20 px-8' : ""} {center ? 'center' : ''} {classes}"
	style={customStyles}
	id="{id}">
	<slot />
</section>
