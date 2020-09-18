<script>
	/** The number of columns */
	export let cols;
	/** The gap size (from tailwind) */
	export let gap = 0;
	/** Additional classes to pass in */
	export let classes = '';
	/** Toggle resizing to one column on mobile */
	export let responsive = true;
</script>

<!--
	@component
	Provides a tailwindcss mobile-first grid. It will always resize to one column on mobile, unless responsive is set to false.
-->
<div class="grid {responsive ? 'grid-cols-1' : ''} gap-{gap} {responsive ? 'md:' : ''}grid-cols-{cols} {classes}">
	<slot />
</div>
