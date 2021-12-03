<script>
	export let cols = false;
	export let wrap = false;
	export let both = false;
	export let justify = both || 'start';
	export let align = both || 'stretch';

	export const blueprint = {};

	export let classes = '';
</script>

<div
	class="flex {cols ? 'flex-col' : 'flex-row'}
		{wrap ? 'flex-wrap' : 'flex-no-wrap'} justify-{justify} items-{align}
		{classes}">
	<slot />
</div>
