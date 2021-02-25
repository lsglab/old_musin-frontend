<script>
	/** Toggle 100% height */
	export let fullscreen = false;
	/** Additional classes to pass in */
	export let classes = '';
	/** Center content */
	export let center = false;
	// custom padding
	export let padding = false;
	// custom styles (f.e. 'padding: 20px')
	export let customStyles = '';
	/** ID of the section */
	export let id = '';
</script>

<style lang="scss">
	.dashedTopBorder::before {
		top: -20px;
		height: 1px;
	}

	.dashedBottomBorder::after {
		bottom: 0;
		height: 1px;
	}

	section {
		position: relative;

		&::before,
		&::after {
			content: '';
			width: 100%;
			height: 0;
			position: absolute;
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
	class="{classes} {fullscreen ? 'fullscreen' : 'w-full'} {padding ? `${padding}` : "px-5vw 2xl:px-15vw"} {center ? 'center' : ''}"
	style={customStyles}
	id="{id}">
	<slot />
</section>
